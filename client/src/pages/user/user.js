import React, { Component } from 'react';
import {Card,Button,Modal,Form, Icon,Input} from 'antd'
const iconStyle={ color: 'rgba(0,0,0,.25)' }
class User extends Component {
  state = { 
    visible: false,
    confirmLoading: false,
  }
  constructor(){
    super()
    this.cardTitle=(
      <Button type="primary" onClick={this.showModal}>创建用户</Button>
    )
  }  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handelAddUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 1000);
      }else{
        return
      }
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading } = this.state;
    return (
      <Card title={this.cardTitle} extra={<a href="#">More</a>}>
        <p>用户管理</p>
        <Modal
          title="创建用户"
          visible={visible}
          onOk={this.handelAddUser}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
        <Form onSubmit={this.handelAddUser} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={iconStyle} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={iconStyle} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号!' }],
            })(
              <Input
                prefix={<Icon type="phone" style={iconStyle} />}
                type="number"
                placeholder="请输入手机号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入正确的邮箱!',type:"email"}],
            })(
              <Input
                prefix={<Icon type="mail" style={iconStyle} />}
                type="email"
                placeholder="请输入邮箱"
              />,
            )}
          </Form.Item>
      </Form>
      </Modal>
      </Card>
    );
  }
}
export default Form.create({ name: 'normal_login' })(User);
