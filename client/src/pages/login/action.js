
import {LOGIN_USER_INFO} from './action-type'
import {reqLogin} from 'api/index'
import {message} from 'antd'
import store from '../../utils/storeUtils'
export const getLoginUserInfo = (loginInfo)=>{
  return async (dispatch,getState)=>{
    // console.log(getState())
    const res = await reqLogin(loginInfo)
      if (res.status === 0) {
        message.success('登录成功！')
        // 分发一个同步action
        dispatch(
          {
            type:LOGIN_USER_INFO,
            data:res.data
          }
        )
        store.set('user_key', res.data) //全局存储
        store.set('token', res.token) //全局存储
      } 
  }
}