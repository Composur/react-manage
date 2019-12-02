import React, { Component } from 'react';
import {Card,Button,Modal,Form, Icon,Input,message,Table,Popconfirm,Select} from 'antd'
import moment from 'moment'
import {reqAddUser,reqUserList,reqDeleteUser,reqUpdateUser} from 'api'
const {Option} = Select
const iconStyle={ color: 'rgba(0,0,0,.25)' }
class User extends Component {
  state = { 
    visible: false,
    confirmLoading: false,
    loading:false,
    record:{},
    isUpdate:false,
    tableData:[],
    roles:[]
  }
  constructor(){
    super()
    this.cardTitle=(
      <Button type="primary" onClick={(e)=>{e.stopPropagation();this.showModal(false)}}>创建用户</Button>
    )
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'username',
      },
      {
        title: '手机',
        dataIndex: 'phone',
        // sorter: (a, b) => a.phone - b.phone,
        // sortDirections: ['descend', 'ascend'],
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '角色',
        dataIndex: 'role_id',
        render:(record)=>(this.initTableRoleText(record))
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        sorter: (a, b) => a.create_time - b.create_time,
        sortDirections: ['descend', 'ascend'],
        render:(create_time)=>(moment(create_time).format('YYYY-MM-DD HH:mm:ss'))
      },
      {
        title: '操作',
        render:(record)=>(
          <Popconfirm
            title="确认删除?"
            onConfirm={(e)=>{e.stopPropagation();this.deleteUser(record)}}
            okText="确定"
            cancelText="取消"
          >
          <Button type='link'>删除</Button>
          <Button type='link' onClick={(e)=>{e.stopPropagation();this.showModal(record)}}>更新</Button>
          </Popconfirm>
          )
      },
    ];
  }  
  showModal = (record) => {
    this.setState({
      visible: true,
      isUpdate:record?true:false,
      record
    });
  };
  // 创建/更新用户
  handelAddUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        const {isUpdate,record} = this.state
        let res={}
        if(isUpdate){
          values={...values,_id:record._id}
          res =  await reqUpdateUser(values)
        }else{
          res =  await reqAddUser(values)
        }
        if(res.status===0){
          message.success('添加成功！')
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          this.props.form.resetFields()
          // 更新列表
          this.getUserList()
        }else{
          this.setState({
            confirmLoading: false,
          });
        }
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
  // 关闭模态框
  handleCancel = () => {
    // 取消的时候重置表单
    this.setState({
      visible: false,
      confirmLoading: false,
    });
    this.props.form.resetFields()
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
      tableData:data.users,
      roles:data.roles
    })
  }
  // 初始化table角色显示文字
  initTableRoleText=(role_id)=>{
    const {roles} = this.state
    return  this.roleName = roles.reduce((pre,next)=>{
      if(role_id===next._id){
         pre = next.name
      }
      return pre
    },'')
  }
  componentDidMount(){
    this.getUserList()
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading,loading,tableData,record ,isUpdate,roles} = this.state;
    const selectView=roles.map(item=>{
      return(
        <Option key={item._id} value={item._id}>{item.name}</Option>
      )
    })
    return (
      <Card title={this.cardTitle}>
        <Modal
          title={isUpdate?"更新用户":"创建用户"} 
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
              initialValue:record.username
            }
            )(
              <Input
                prefix={<Icon type="user" style={iconStyle} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          {
            isUpdate?null:<Form.Item>
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
          }
          <Form.Item>
            {getFieldDecorator('phone', {
              // rules: [{ required: true, pattern:/^1[3456789]\d{9}$/, message: '请输入正确的手机号!' }],
              initialValue:record.phone
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
              initialValue:record.email
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
              rules: [{ required: true, message: '请选择角色!'}],
              initialValue:record.role_id
            })(
              <Select placeholder='请选择角色！'>
                 {selectView}
              </Select>
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
