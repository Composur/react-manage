import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import LinkA from 'components/link-a'
export default class  extends Component {
  state = {  }
  params={
    href:'https://github.com/Composur/react-manage',
    target:'_black',
    text:'源码'
  }
  chatHref={
    href:'https://github.com/Composur/react-practice/tree/master/react-chat',
    target:'_black',
    text:'源码'
  }
  blogHref={
    href:'https://github.com/Composur/vue-project/tree/master/vue-blog2',
    target:'_black',
    text:'源码'
  }
  render() {
    return (
      <div style={{padding: '30px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="React 管理系统"  hoverable={true} extra={<LinkA props={this.props} params={this.params}/>}>
            <p> * 包括前端 PC 应用和后端应用,包括用户管理 / 商品分类管理 / 商品管理 / 权限管理等功能模块</p>
            <p> * 前端: 使用 React 全家桶 + Antd + Axios + ES6 + Webpack 等技术</p>
            <p> * 后端: 使用 Node + Express + Mongodb 等技术</p>
            </Card>
          </Col>
          <Col span={8}>
          <Card title="React 在线聊天系统"  hoverable={true} extra={<LinkA props={this.props} params={this.chatHref}/>}>
            <p> * 包括前端应用和后端应用注册，包括用户注册/登陆, 管理员/普通用户列表, 实时聊天，消息等模块</p>
            <p> * 前端: 使用 React 全家桶+ES6+Webpack 等技术</p>
            <p> * 后端: 使用 Node + express + mongodb + socketIO 等技术</p>
          </Card>
        </Col>
          <Col span={8}>
            <Card title="vue 博客系统"  hoverable={true}extra={<LinkA props={this.props} params={this.blogHref}/>}>
              <p>前端加后台</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}