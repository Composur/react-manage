import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getLoginUserInfo} from './action'
import './login.less'
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(
      async (err, values) => { //可以对所有结果校验，并返回结果
        if (!err) {
          values=Object.assign(values,{username:btoa(values.username),password:btoa(values.password)})
          this.props.getLoginUserInfo(values)
        }
      });
  };
  // 自定义密码验证规则
  validatorPwd=(rule, value, callback)=>{
    // 无论验证成功与否callback()必须调用
    if(!value){
      callback('请输入密码！')
    }else if(value.length<4||value.length>12){
      callback('密码长度应大于4小于12位！') //验证不通过传入错误提示
    }
    callback()//验证成功无提示
  }
  render() {
    // 如果检测到登录信息自动登录
    const {userInfo} = this.props 
    if(userInfo._id){
      return <Redirect to='/home'/>
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <div className='header'>
        </div>
        <div className='content'>
          <section className='login-form'>
          <div className='login-label'> <span >管理平台</span></div>
          <Form onSubmit={this.handleSubmit} className="">
          <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true,message: '请输入用户名！',min:4},
              { message: '用户名长度应大于4小于12位！',min:4,max:12},
              { message: '用户名只能含有数字、英文、下划线!',pattern:/^[a-zA-Z0-9_]+$/ },//+号可以匹配任意多个字符
            ],
            initialValue: 'admin', // 初始值
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { validator:this.validatorPwd},//自定义校验规则
            ],
            initialValue: 'admin', // 初始值
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit" className='login-btn' onClick={this.onSubmit}>
            登录
          </Button>
          </Form.Item>
        </Form>
          </section>
        </div>
      </div>
    );
  }
}

const WrappeLoginForm = Form.create({ name: 'normal_login' })(Login);


const mapStateToProps=(state)=>({
  userInfo:state.loginUserInfo
})

const mapDispatchToProps={getLoginUserInfo}

export default connect(mapStateToProps,mapDispatchToProps)(WrappeLoginForm)
