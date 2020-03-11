import React, { useState, useEffect } from 'react';
import { Button,Input,message} from 'antd';
import store from 'store'
const token = store.get('token')
const SIZE = 10 * 1024 * 1024; // 切片大小
const uploadUrl = '/bigupload'
const mergeUrl = '/mergefile'
// 封装请求
const request = ({
  url,
  method = 'post',
  data,
  headers = {Authorization:token},
  requestList
})=>{
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    headers.Authorization = token
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
}

// 文件切片
const createFileChunk = (file,size=SIZE)=>{
  const fileChunkList = [];
  let cur = 0;
  while(cur<file.size){
    fileChunkList.push({file:file.slice(cur,cur+size)})
    cur += size
  }
  return fileChunkList.map((item,index)=>{
    return {
      chunk:item.file,
      hash:file.name+'-'+index
    }
  })
}

// 上传
const requestList =(file,container)=>(
    file.map(({chunk,hash})=>{
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename',container.name)
      return {formData}
    }).map( async ({formData}) =>{
     await request({
        url:uploadUrl,
        data:formData
      })
    })
  )
// 合并请求
const mergeRequest = async (container)=>{
  await request({
    url:mergeUrl,
    headers:{ "content-type": "application/json"},
    data:JSON.stringify({
      filename:container.name,
      size:SIZE
    })
  })
}

function UploadSlice() {
  const [file,setFile] = useState([])
  const [container,setContainer] = useState({}) 
  // useEffect 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // console.log(file)
  });
  const handleFileChange = e => {
    const [inputFile] = e.target.files
    // 存一个初始的全局文件对象
    setContainer(inputFile)
    // 文件切片
    setFile(createFileChunk(inputFile))
  };
  const handleUpload = async ()=>{
    if(!container.name) return 
    // 切片上传
     await Promise.all(requestList(file,container))
    // message.success(uploadResult.msg)
    // if(uploadResult.status === 1) return
    // 上传完成通知后台进行合并
     await mergeRequest(container)
  }
  return (
    <div>
      <Input type='file' onChange={handleFileChange}></Input>
      <Button onClick={handleUpload}>点击上传</Button>
    </div>
  );
}

export default UploadSlice;
