import React, { Component } from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'
class UpdateForm extends Component {
  static propTypes={
    currentRowData:PropTypes.object.isRequired,
    setForm:PropTypes.func.isRequired
  }
  componentDidMount(){
    this.props.setForm(this.props.form)
  }
  render() {
    const {name}=this.props.currentRowData
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
    
      <Form.Item label="分类名称">
        {getFieldDecorator('categoryName', {
          rules: [{ required: true, message: '请输入分类名称!' }],
          initialValue:name
        })(<Input placeholder="输入分类"/>)}
       </Form.Item>

      </Form>
    );
  }
}
const WrappedApp = Form.create()(UpdateForm);
export default (WrappedApp);