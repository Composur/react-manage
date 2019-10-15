/**
 * 应用根组件
 */
import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <Switch>{/* switch只匹配一个path */}
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/'} component={Admin}></Route>
      </Switch>
     </BrowserRouter>
    );
  }
}

export default App;
