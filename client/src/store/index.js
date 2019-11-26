import {createStore,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
// 生成环境配置
// import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import reducer from './reducer'

/**
 * @description createStore(reducer,initState,applyMiddle)
 * @description  如果没有initState 默认第二项是中间件函数
 */

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export default  createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(ReduxThunk)))
export default createStore(reducer,
  process.env.NODE_ENV==='development'?composeWithDevTools(applyMiddleware(ReduxThunk)):(applyMiddleware(ReduxThunk)))