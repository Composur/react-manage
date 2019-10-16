import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import { Layout } from 'antd';
import store from '../../utils/storeUtils'
import HeaderSelf from '../../components/header'
import LeftNav from '../../components/left-nav'
const { Header, Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    if(!store.user){
      return  <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100vh'}}>
          <Sider  breakpoint="lg" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <LeftNav/>
          </Sider>
          <Layout>
            <Header>
              <HeaderSelf/>
            </Header>
            <Content style={{background:'#fff'}}>Content</Content>
            <Footer style={{textAlign:'center'}}>Footer</Footer>
          </Layout>
      </Layout>
    );
  }
}