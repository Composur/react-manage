/**
 * @description 封装axios
 */
import {message} from 'antd'
import store from 'store'
import config from '../config'
import axios from 'axios'

// 把 Token 存在localStroage,每次请求在 Axios 请求头上进行携带
axios.defaults.headers.common['Authorization'] = store.get('token')


// instance.interceptors.response.use(
//   response => {
//     return response
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           // router.replace({
//           //   path: 'login',
//           //   query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//           // })
//       }
//     }
//     return Promise.reject(error.response)
//   }
// )

export default function (url, type = 'GET', data) {
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
      promise = axios.get(url+'?'+paramStr)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      // 2.成功调用resolve
      if(res.data&&res.data.status===0){
          resolve(res.data)
      }else{
        message.error(res.data.msg)
      }
    }).catch(err => {
      // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
      message.error('请求出错'+err.message)
    })
  })
}