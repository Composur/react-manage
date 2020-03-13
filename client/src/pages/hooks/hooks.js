import React, { useState, useEffect } from "react";
import { Button, Input, message, Row, Col, Progress, Table } from "antd";
import store from "store";
const token = store.get("token");
const SIZE = 10 * 1024 * 1024; // 切片大小
const uploadUrl = "/bigupload";
const mergeUrl = "/mergefile";
const requestResults = [];

const columns = [
  {
    title: "文件切片名",
    dataIndex: "hash",
    key: "hash"
  },
  {
    title: "切片大小",
    dataIndex: "chunk",
    render(h) {
      return Math.floor(h.size/1024)
    },
  },
  {
    title: "上传进度",
    dataIndex: "percentage",
    render(h) {
      return (<Progress percent={h}/>)
    },
  },
  {
    title: "操作",
    render(h) {
      return ( <Button type="link" danger>
      操作
    </Button>)
    },
  },
];

// 封装请求
const request = ({
  url,
  method = "post",
  data,
  headers = { Authorization: token },
  onProgress = e => e,
  requestList
}) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = onProgress;
    xhr.open(method, url);
    headers.Authorization = token;
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = e => {
      resolve({
        data: e.target.response
      });
    };
  });
};

// 文件切片
const createFileChunk = (file, size = SIZE) => {
  const fileChunkList = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return fileChunkList.map((item, index) => {
    return {
      chunk: item.file,
      hash: file.name + "-" + index,
      index: index,
      percentage:0,
    };
  });
};
// 切片进度条 给文件添加一个 percentage 属性
const createProgressHandler = (item, setFile, file) => {
  return e => {
    item.percentage = parseInt(String((e.loaded / e.total) * 100));
    const result = file.map(v => {
      if (v.hash === item.hash) {
        v.percentage = item.percentage;
      }
      return v;
    });
    setFile(result);
  };
};
// 上传
const requestList = (file, container, setFile) =>
  file
    .map(({ chunk, hash, index }) => {
      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("hash", hash);
      formData.append("filename", container.name);
      return { formData, index };
    })
    .map(async ({ formData, index }) => {
      const result = await request({
        url: uploadUrl,
        data: formData,
        onProgress: createProgressHandler(file[index], setFile, file)
      });
      requestResults.push(result);
    });
// 合并请求
const mergeRequest = async container => {
  await request({
    url: mergeUrl,
    headers: { "content-type": "application/json" },
    data: JSON.stringify({
      filename: container.name,
      size: SIZE
    })
  });
};
function UploadSlice() {
  const [file, setFile] = useState([]);
  const [container, setContainer] = useState({});
  const [loading, setLoading] = useState(false);
  // useEffect 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {}, [file]);
  const handleFileChange = e => {
    const [inputFile] = e.target.files;
    // 存一个初始的全局文件对象
    setContainer(inputFile);
    // 文件切片
    setFile(createFileChunk(inputFile));
  };
  const handleUpload = async () => {
    if (!container.name) return;
    setLoading(true)
    // 切片上传
    await Promise.all(requestList(file, container, setFile));
    requestResults.forEach(item => {
      const { status, msg } = JSON.parse(item.data);
      if (status === 1) {
        message.error(msg);
        return;
      }
    });
    setLoading(false)
    // 上传完成通知后台进行合并
    await mergeRequest(container);
  };
  return (
    <div>
      <Row>
        <Col span={16}>
          <Input type="file" onChange={handleFileChange}></Input>
        </Col>
        <Col span={6} push={1}>
          <Button type="primary" onClick={handleUpload} loading={loading}>
            点击上传
          </Button>
        </Col>
      </Row>
      <Row>
        <Table columns={columns} dataSource={file} rowKey = {(record)=>record.hash}/>
      </Row>
    </div>
  );
}

export default UploadSlice;
