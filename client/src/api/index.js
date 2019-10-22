/**
 * @param 应用接口
 */
import request from '../utils/axios'
import jsonp from 'jsonp'
import {
  message
} from 'antd'
export const reqLogin = data => request('/login', 'POST', data)
export const reqAddUser = data => request('/manage/user/add', 'POST', data)
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    const getData = (city = '深圳') => {
      const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      jsonp(url, {}, (err, data) => {
        if (data && data.status === 'success') {
          resolve(data.results[0].weather_data[0])
        } else {
          message.error(err)
        }
      })
    }
    if ("geolocation" in navigator) {
      /* 地理位置服务可用 */
      navigator.geolocation.getCurrentPosition(function (position) {
        const city = `${position.coords.longitude},${position.coords.latitude}`
        getData(city)
      })
    } else {
      /* 地理位置服务不可用 */
      getData()
    }
   
  })
}

export const reqAddress=(fn)=>{
    jsonp("http://api.map.baidu.com/api?v=2.0&ak=PFlNd9vKhGalbukR6ZIlFKzKvFsutPWV",{},()=>{
      if(window.BMap){
        var geolocation = new window.BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == window.BMAP_STATUS_SUCCESS){
            console.log(r.point)
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
          }
          else {
            // alert('failed'+this.getStatus());
          }        
        },{enableHighAccuracy: true})
      }
    })
}