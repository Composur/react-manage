/**
 * @param 应用接口
 */
import request from '../utils/axios'
import jsonp from 'jsonp'
// import md5 from 'md5'
import {
  message
} from 'antd'
export const reqLogin = data => request('/login', 'POST', data)
export const reqAddUser = data => request('/manage/user/add', 'POST', data)

export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const getData = (city='深圳') => {
      const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      jsonp(url, {}, (err, data) => {
        if (data && data.status === 'success') {
          resolve(data.results[0].weather_data[0])
        } else {
          message.error(data.status)
        }
      })
    }
    getData(city)
    // if ("geolocation" in navigator) {
    //   getData()
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     console.log(position)
    //     const city = `${position.coords.longitude},${position.coords.latitude}`
    //     getData(city)
    //   })
    // } else {
    //   getData()
    // }
  })
}

export const reqAddress=()=>{
    return new Promise((resolve,reject)=>{
      jsonp('https://api.map.baidu.com/location/ip?ak=PFlNd9vKhGalbukR6ZIlFKzKvFsutPWV',{},(err,data)=>{
        if(data&&data.status===0){
          resolve(data.content)
        }else{
          message.error('请求定位接口失败')
          reject('请求定位接口失败')
        }
      })
    })
}