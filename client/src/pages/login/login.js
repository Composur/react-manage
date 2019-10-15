import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';
import './login.less'

class Login extends Component {
  constructor(){
    super()
    this.state={
      username:'',
      password:''
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => { //可以对所有结果校验，并返回结果
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  // 自定义密码验证规则
  validatorPwd=(rule, value, callback)=>{
    // 无论验证成功与否callback()必须调用
    if(value.length<4||value.length>12){
      callback('密码长度应大于4小于12位！') //验证不通过传入错误提示
    }
    callback()//验证成功无提示
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <div className='header'>
        </div>
        <div className='content'>
          <section className='login-form'>
          <div className='login-label'> <span >代购管理平台</span></div>
          <Form onSubmit={this.handleSubmit} className="">
          <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true,message: '请输入用户名！'},
              { message: '用户名长度应大于4小于12位！',min:4,max:12},
              { message: '用户名只能含有数字、英文、下划线!',pattern:/^[a-zA-Z0-9_]+$/ },//+号可以匹配任意多个字符
            ],
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
              { required: true, message: '请输入密码!' },
              { validator:this.validatorPwd},//自定义校验规则
            ],
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
export default WrappeLoginForm
