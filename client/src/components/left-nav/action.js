import {SETHEADTITLE} from './action-type'

// 设置title名称的同步action
export const setHeadTitle = (title)=>{
  return {
    type:SETHEADTITLE,
    data:title
  }
}