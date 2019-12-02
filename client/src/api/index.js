/**
 * @param 应用接口
 */
import request from '../utils/axios'
import jsonp from 'jsonp'
// import md5 from 'md5'
import { message} from 'antd'

// 登录
export const reqLogin = data => request('/login', 'POST', data)

// 新增用户
export const reqAddUser = data => request('/manage/user/add', 'POST', data)

// 删除用户
export const reqDeleteUser = data => request('/manage/user/delete', 'POST', data)

// 更新用户
export const reqUpdateUser = data => request('/manage/user/update', 'POST', data)

// 用户列表
export const reqUserList = data => request('/manage/user/list', 'GET', data)

// 获取天气-百度api
export const reqWeather = (city) => {
  return new Promise((resolve, reject) => {
    const getData = (city) => {
      const url = `https://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
      jsonp(url, {}, (err, data) => {
        if (data && data.status === 'success') {
          resolve(data.results[0].weather_data[0])
        } else {
          if(data){
            message.error(data.status)
          }else{
            message.error('请求出错，请检查网络是否正常！')
          }
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

// 定位
export const reqAddress=()=>{
    return new Promise((resolve,reject)=>{
      jsonp('https://api.map.baidu.com/location/ip?ak=PFlNd9vKhGalbukR6ZIlFKzKvFsutPWV',(err,data)=>{
        if(data&&data.status===0){
          resolve(data.content)
        }else{
          message.error('请求定位接口失败')
          reject('请求定位接口失败')
        }
      })
    })
}

// 获取分类列表
export const reqCatagoryList=(data)=>request('/manage/category/list','GET',data)

// 添加分类
export const reqAddCategory=(data)=>request('/manage/category/add','POST',data)

// 删除分类
export const reqDeleteCategory=(data)=>request('/manage/category/delete','POST',data)

// 更新分类
export const reqUpdateCategory=(data)=>request('/manage/category/update','POST',data)

// 获取分类名称
export const reqCategoryName=(data)=>request('/manage/category/info','GET',data)

// 添加产品
export const reqAddProduct=(data)=>request('/manage/product/add','POST',data)

// 上传图片
export const reqUploadImg=(data)=>request('/manage/img/upload','POST',data)

// 删除上传图片
export const reqDelUploadImg=(data)=>request('/manage/img/delete','POST',data)




// 产品上架/下架
export const reqProductStatus=(data)=>request('/manage/product/updateStatus','POST',data)

// 产品上架/下架
export const reqProductUpdate=(data)=>request('/manage/product/update','POST',data)

// 删除产品
export const reqDeleteProduct=(data)=>request('/manage/product/delete','POST',data)

// 获取产品列表
export const reqProductList=(data)=>request('/manage/product/list','GET',data)

// 搜索产品
export const reqSearchProduct=(data)=>request('/manage/product/search','GET',data)


// 添加角色
export const reqAddRole=(data)=>request('/manage/role/add','POST',data)

// 删除角色
export const reqDeleteRole=(data)=>request('/manage/role/delete','POST',data)

// 角色列表
export const reqRoleList=(data)=>request('/manage/role/list','GET',data)

// 设置权限
export const reqSettingRole=(data)=>request('/manage/role/update','POST',data)