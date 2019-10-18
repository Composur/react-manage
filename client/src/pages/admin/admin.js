import React, { Component } from 'react';
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';
import store from '../../utils/storeUtils'
import HeaderSelf from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Product from '../product/product'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Bar from '../charts/bar'
const {Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    if(!store.user){
      return  <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100vh'}}>
          <Sider  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <LeftNav/>
          </Sider>
          <Layout>
              <HeaderSelf/>
            <Content style={{margin:'14px',background:'#fff'}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/role' component={Role}/>
                <Route path='/user' component={User}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Redirect to='/home' />
              </Switch>
            </Content>
            <Footer style={{textAlign:'center',margin:'0 14px 0',background:'#fff'}}>Footer</Footer>
          </Layout>
      </Layout>
    );
  }
}