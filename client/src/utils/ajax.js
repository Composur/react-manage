import axios from 'axios';
import { message } from 'antd';
import config from '../config';
// 从localStorage中获取token
function getLocalToken() {
  const token = window.localStorage.getItem('token');
  return token;
}

function refreshToken() {
  return instance.post('/refreshtoken').then((res) => res.data);
}
// 创建一个axios实例
const instance = axios.create({
  baseURL: config.baseURl,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: getLocalToken(), // headers塞token
  },
});

// 给实例添加一个setToken方法，用于登录后将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (token) => {
  instance.defaults.headers.Authorization = token;
  window.localStorage.setItem('token', token);
};

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
// 拦截返回的数据
instance.interceptors.response.use(
  (response) => {
    const { status } = response.data;
    // 根据后台请求超时状态码的返回
    if (status === 1000) {
      const { config } = response; // 这个就是原来的请求
      if (!isRefreshing) {
        isRefreshing = true;
        // 说明token过期了,刷新token
        return refreshToken()
          .then((res) => {
            // 刷新token成功，将最新的token更新到header中，同时保存在localStorage中
            const { token } = res;
            instance.setToken(token);
            // 获取当前失败的请求
            // 重置一下配置
            config.headers.Authorization = token;
            config.baseURL = ''; // url已经带上了/api，避免出现/api/api的情况

            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach((cb) => cb(token));
            // 重试完了别忘了清空这个队列（掘金评论区同学指点）
            requests = [];

            // 重试当前请求并返回promise
            return instance(config);
          })
          .catch((res) => {
            console.error('refreshtoken error =>', res);
            // 刷新token失败，神仙也救不了了，跳转到首页重新登录吧
            window.location.href = '/';
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
      // 正在刷新token，返回一个未执行resolve的promise
      return new Promise((resolve) => {
        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
        requests.push((token) => {
          config.baseURL = '';
          config.headers.Authorization = token;
          resolve(instance(config));
        });
      });
    }
    return response;
  },
  (error) => {
    debugger;
    return Promise.reject(error);
  },
);

export default function (url, type = 'GET', data = {}) {
  let promise;
  // url=config.baseURl+url
  // 返回一个promise，统一处理错误
  return new Promise((resolve, reject) => {
    // 1.执行异步请求
    if (type === 'GET') {
      let paramStr = '';
      Object.keys(data).forEach((key) => {
        paramStr += `${key}=${data[key]}&`;
      });
      if (paramStr) {
        paramStr = paramStr.substring(0, paramStr.length - 1);
      }
      promise = instance.get(`${url}?${paramStr}&t=${new Date()}`);
    } else {
      promise = instance.post(url, data);
    }
    promise
      .then((res) => {
        // 2.成功调用resolve
        if (res.data && res.data.status === 0) {
          resolve(res.data);
        } else {
          message.error(res.data.msg);
          resolve(res.data);
        }
      })
      .catch((err) => {
        const { data } = err;
        if (data && data.msg) {
          message.error(`请求出错${data.msg}`);
          return;
        }
        // 3.失败调用reject，但是不能调用，调用就进入外层catch里了，为了不在外层用try...catch这里显式的返回error
        message.error(`请求出错${err.message}`);
      });
  });
}
