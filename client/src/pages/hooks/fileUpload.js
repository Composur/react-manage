import React, { useState, useEffect } from 'react';
import {
  Button, Input, message, Row, Col, Progress, Table,
} from 'antd';
import store from 'store';
import { calculateHash, createFileChunk } from './calculate-hash';

const SIZE = 10 * 1024 * 1024; // 切片大小
const uploadUrl = '/api//bigupload';
const mergeUrl = '/api/mergefile';
const verifyUrl = '/api/verify';
const requestResults = [];


const columns = [
  {
    title: '文件名',
    dataIndex: 'filename',
  },
  {
    title: '文件切片名',
    dataIndex: 'hash',
    key: 'hash',
  },
  {
    title: '切片大小（MB）',
    dataIndex: 'chunk',
    render(h) {
      return Math.floor(h.size / 1024);
    },
  },
  {
    title: '上传进度',
    dataIndex: 'percentage',
    render(h) {
      return <Progress percent={h} />;
    },
  },
  {
    title: '操作',
    render(h) {
      return <Button type="link">操作</Button>;
    },
  },
];

// 封装请求
const request = ({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress = (e) => e,
  requestList,
}) => new Promise((resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.upload.onprogress = onProgress;
  xhr.open(method, url);
  headers.Authorization = store.get('token');
  Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
  xhr.send(data);
  xhr.onload = (e) => {
    resolve({
      data: e.target.response,
    });
  };
});


// 切片进度条 给文件添加一个 percentage 属性
const createProgressHandler = (item, setFile, file) => (e) => {
  item.percentage = parseInt(String((e.loaded / e.total) * 100));
  const result = file.map((v) => {
    if (v.hash === item.hash) {
      v.percentage = item.percentage;
    }
    return v;
  });
  setFile(result);
};

// 上传
const requestList = (file, container, setFile) => file
  .map(({
    chunk, hash, index, fileHash,
  }) => {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash);
    formData.append('filename', container.name);
    formData.append('fileHash', fileHash);
    return { formData, index };
  })
  .map(async ({ formData, index }) => {
    const result = await request({
      url: uploadUrl,
      data: formData,
      onProgress: createProgressHandler(file[index], setFile, file),
    });
    requestResults.push(result);
  });

// 合并请求
const mergeRequest = async (container, fileHash) => {
  await request({
    url: mergeUrl,
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify({
      filename: container.name,
      fileHash,
      size: SIZE,
    }),
  });
};

//  预请求验证 hash (确实是否已经上传)
const verifyUpload = async (filename, fileHash) => {
  const { data } = await request({
    url: verifyUrl,
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify({
      filename,
      fileHash,
    }),
  });
  return JSON.parse(data);
};

function UploadSlice() {
  // 必须把hooks写在函数的最外层
  // 不能写在 if...else 等条件语句当中
  const [file, setFile] = useState([]);
  const [container, setContainer] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  // 计算 hash 百分比
  const [hashPercentage, setHashPercentage] = useState(0);

  // useEffect 相当于 componentDidMount 和 componentDidUpdate、componentWillUnmount
  useEffect(() => {}, [file]);
  const handleFileChange = (e) => {
    const [inputFile] = e.target.files;
    // 存一个初始的全局文件对象
    setContainer(inputFile);
  };
  const handleUpload = async () => {
    if (!container.name) return;
    setLoading(true);
    // 文件切片
    const fileChunkList = createFileChunk(container, SIZE);
    // 计算文件 hash
    const fileHash = await calculateHash(fileChunkList, setHashPercentage);
    const data = fileChunkList.map((item, index) => ({
      filename: container.name,
      fileHash,
      chunk: item.file,
      // hash: container.name + "-" + index,
      hash: `${fileHash}-${index}`,
      index,
      percentage: 0,
    }));
    // 验证文件是否已经存在
    const { shouldUpload } = await verifyUpload(container.name, fileHash);
    if (!shouldUpload) {
      message.error('文件已存在');
      setLoading(false);
      return;
    }
    // 渲染 dom
    setTableData(data);
    // 切片上传
    await Promise.all(requestList(data, container, setFile));
    setLoading(false);
    // 上传完成通知后台进行合并
    await mergeRequest(container, fileHash);
  };
  return (
    <div>
      <Row>
        <Col span={16}>
          <Input type="file" onChange={handleFileChange} />
        </Col>
        <Col span={6} push={1}>
          <Button type="primary" onClick={handleUpload} loading={loading}>
            点击上传
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: '10px' }}>
        <Col span={6} style={{ fontSize: '14px' }}>
          计算 hash 进度 ：
        </Col>
        <Col span={18}>
          <Progress percent={hashPercentage} />
        </Col>
      </Row>
      <Row>
        <Table
          bordered
          columns={columns}
          size="small"
          dataSource={tableData}
          rowKey={(record) => record.hash}
        />
      </Row>
    </div>
  );
}

export default UploadSlice;
