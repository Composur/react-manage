/**
 * @description 封装axios
 */
// import React from 'react';
import {message} from 'antd'
import store from 'store'
import config from '../config'
import axios from 'axios'
// import {Redirect} from 'react-router-dom'

// 把 Token 存在localStroage,每次请求在 Axios 请求头上进行携带
// function redirect(){
//   return  (<Redirect to={'/login'}></Redirect>)
// }

// 请求拦截
axios.interceptors.request.use()

// 响应拦截
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
        // store.clearAll();
        // redirect();
        break;
        default:
        return
      }
    }
    return Promise.reject(error.response)
  }
)

export default function (url, type = 'GET', data={}) {
  axios.defaults.headers.common['Authorization'] = store.get('token')
  let promise;
  url=config.baseURl+url
  // 返回一个promise，统一处理错误
  return new Promise((resolve, reject) => {
    // 1.执行异步请求
    if (type === 'GET') {
      let paramStr = ''
      Object.keys(data).forEach(key => {
          paramStr += `${key}=${data[key]}&`
      })
      if(paramStr) {
          paramStr = paramStr.substring(0, paramStr.length-1)
        }
      promise = axios.get(url+'?'+paramStr+'&t='+new Date())
    } else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      // 2.成功调用resolve
      if(res.data&&res.data.status===0){
          resolve(res.data)
      }else{
        message.error(res.data.msg)
        resolve(res.data)
      }
    }).catch(err => {
      const {data}= err
      if(data&&data.msg){
        message.error('请求出错'+data.msg)
        return 
      }
      // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
      message.error('请求出错'+err.message)
    })
  })
}