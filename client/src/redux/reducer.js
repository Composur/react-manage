import {combineReducers} from  'redux' 
import getHeadTitle from 'components/left-nav/reducer'
import loginUserInfo from '../pages/login/reducer'

/**
 * @description 接收多个reducer合并成一个reducer
 * @default 接收的 reducer 返回的 state对象不能是 undefined
 */
export default combineReducers({
  getHeadTitle,
  loginUserInfo
})


