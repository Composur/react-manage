import {createStore,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
// 生成环境配置
// import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import appReducer from './reducer'

/**
 * @description createStore(reducer,initState,applyMiddle)
 * @description  如果没有initState 默认第二项是中间件函数
 */

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default  createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(ReduxThunk)))



/** 
 * @description 可以编写中间件增强dispatch的功能,例如redux-thunk等
 * @description 也可以编写 Store Enhancer 增强store的功能
 */

//  增强dispatch的功能实现日志打印，返回了一个增强的store
//  const doNothingEnhancer = (createStore) => (reducer, initStore, enhancer) => {
//    const store = createStore(reducer, initStore, enhancer)
//    const enhancerDispatch = store.dispatch;
//    store.dispatch = (action) => {
//      console.log('dispatch action', action)
//      enhancerDispatch(action)
//    }
//    return store
//  }
//  export default doNothingEnhancer(createStore)(reducer,{},composeWithDevTools(applyMiddleware(ReduxThunk)))

export default createStore(appReducer,  process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(ReduxThunk)) : (applyMiddleware(ReduxThunk)))
