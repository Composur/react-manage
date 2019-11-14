import React, { Component } from 'react';
import {Card,Button,Modal,Form, Icon,Input,message,Table} from 'antd'
import moment, { locale } from 'moment'
import {reqAddUser,reqUserList,reqDeleteUser} from '../../api'
const iconStyle={ color: 'rgba(0,0,0,.25)' }
class User extends Component {
  state = { 
    visible: false,
    confirmLoading: false,
    loading:false,
    tableData:[],
  }
  constructor(){
    super()
    const {loading}= this.state
    this.cardTitle=(
      <Button type="primary" onClick={this.showModal}>创建用户</Button>
    )
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '手机',
        dataIndex: 'phone',
        sorter: (a, b) => a.phone - b.phone,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '角色',
        dataIndex: 'role_id',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:(create_time)=>(moment(create_time).format('YYYY-MM-DD hh:mm:ss'))
      },
      {
        title: '操作',
        render:(record)=>(<Button loading={loading} type='link' onClick={()=> (this.deleteUser(record))}>删除</Button>)
      },
    ];
  }  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  // 创建用户
  handelAddUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        const res = await reqAddUser(values)
        message.success('添加成功！')
        this.setState({
          visible: false,
          confirmLoading: false,
        });
        // 更新列表
        this.getUserList()
      }else{
        return
      }
    });
  };
  // 删除用户
  deleteUser = async (record)=>{
    this.setState({loading:true})
    const {_id} = record
    const res = await reqDeleteUser({_id})
    if(res){
      this.setState({loading:false})
      message.success('删除成功！')
      this.getUserList()
    }
  }
  handleCancel = () => {
    // 取消的时候重置表单
    this.props.form.resetFields()
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };
  // 用户列表
  getUserList= async()=>{
    this.setState({
      loading:true
    })
    const res = await reqUserList()
    const {data} = res
    this.setState({
      loading:false,
      tableData:data.users
    })
  }
  componentDidMount(){
    this.getUserList()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading,loading,tableData } = this.state;
    return (
      <Card title={this.cardTitle} extra={<a href="#">More</a>}>
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
              // rules: [{ required: true, pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号!' }],
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
              // rules: [{ required: true, message: '请输入正确的邮箱!',type:"email"}],
            })(
              <Input
                prefix={<Icon type="mail" style={iconStyle} />}
                type="email"
                placeholder="请输入邮箱"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('role_id', {
              // rules: [{ required: true, message: '请输入正确角色!'}],
            })(
              <Input
                prefix={<Icon type="user" style={iconStyle} />}
                type="text"
                placeholder="请输入角色"
              />,
            )}
          </Form.Item>
      </Form>
      </Modal>
      <Table dataSource={tableData} columns={this.columns} bordered loading={loading} rowKey={'_id'} size={'small'} 
        pagination={{
          defaultCurrent:1,
          pageSize:3,
          total:tableData.length
        }}
      />
      </Card>
    )
  }
}
export default Form.create({ name: 'normal_login' })(User);
