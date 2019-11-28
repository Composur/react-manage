import {LOGIN_USER_INFO,LOG_OUT} from './action-type'
import store from 'store'
const user = store.get('user_key') || {}
export default (state=user,action)=>{
  switch(action.type){
    case LOGIN_USER_INFO:
      return action.data;
    case LOG_OUT:
      return {};
    default :
      return state;
  } 
}