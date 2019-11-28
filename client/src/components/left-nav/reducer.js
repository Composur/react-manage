import { SETHEADTITLE } from './action-type'


export default (state = '首页', action) => {
  switch (action.type) {
    case SETHEADTITLE:
      return action.data
    default:
      return state
  }
}