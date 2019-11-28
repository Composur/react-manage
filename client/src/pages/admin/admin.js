import React, { Component } from 'react';
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd';
import {connect} from 'react-redux'
import HeaderSelf from '../../components/header'
import LeftNav from '../../components/left-nav'
import FooterComponent from '../../components/footer'
import Home from '../home/home'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Product from '../product'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Bar from '../charts/bar'
import GitHub from '../github'
import Order from '../order/order'

const {Footer, Sider, Content } = Layout;
class Admin extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const {userInfo} = this.props 
    if(!userInfo._id){
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100%'}}>
          <Sider  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <LeftNav/>
          </Sider>
          <Layout>
            <HeaderSelf/>
            <Content style={{margin:'100px 14px 14px',background:'#fff'}}>
              <Switch>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/role' component={Role}/>
                <Route path='/user' component={User}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Route path='/order' component={Order}/>
                <Route path='/GitHub' component={GitHub}/>
                <Redirect to='/home' />
              </Switch>
            </Content>
            <Footer style={{textAlign:'center',margin:'0 14px 0',background:'#fff'}}>
              <FooterComponent/>
            </Footer>
          </Layout>
      </Layout>
    );
  }
}

const mapStateToProps=(state)=>({
  userInfo:state.loginUserInfo
})

export default connect(mapStateToProps,null)(Admin)