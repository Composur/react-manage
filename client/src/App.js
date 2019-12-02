/**
 * 应用根组件
 */
import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import store from './utils/storeUtils'
import reduxStore from './redux'

// 国际化配置
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends Component {
  render() {
    const user= store.get('user_key')
    store.user=user //每次渲染先取出来放到内存中，各个组件取的时候不用store再去取
    return (
    <Provider store={reduxStore}>
      <ConfigProvider locale={zh_CN}>
        <BrowserRouter>
        <Switch>{/* switch只匹配一个path */}
          <Route exact path={'/login'}  component={Login}></Route>
          <Route path={'/'} component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
    </Provider>
    );
  }
}

export default App;
