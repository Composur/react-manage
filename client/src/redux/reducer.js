import {combineReducers} from  'redux' 

/**
 * @description 接收多个reducer合并成一个reducer
 * @default 接收的 reducer 返回的 state对象不能是 undefined
 */

import searchInfo from '../pages/pwa-hooks/Search/reducer'
import list from '../pages/pwa-hooks/List/reducer'
import searchDetail from '../pages/pwa-hooks/reducer'
export default combineReducers({
  ...searchInfo,
  ...list,
  ...searchDetail,
})


