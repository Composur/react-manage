/**
 * @description 封装axios
 */
import {message} from 'antd'
// import config from '../config'
const axios = require('axios')

export default function (url, type = 'GET', data) {
  let promise;
  // url=config.serverAddress+url
  // 返回一个promise，统一处理错误
  return new Promise((resolve, reject) => {
    // 1.执行异步请求
    if (type === 'GET') {
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      // 2.成功调用resolve
      resolve(res.data)
    }).catch(err => {
      // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
      message.error('请求出错'+err.message)
    })
  })
}