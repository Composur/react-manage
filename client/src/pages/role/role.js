import React, { Component } from 'react';
import {Card,Button,Modal,Form, Icon,Input,message,Table} from 'antd'
import moment from 'moment'
import {reqRoleList,reqAddRole,reqDeleteRole} from 'api'
import AuthModal from './auth'
const iconStyle={ color: 'rgba(0,0,0,.25)' }
const PAGE_SIZE=5
class User extends Component {
  state = { 
    visible: false,
    confirmLoading: false,
    loading:false,
    tableData:[],
    role:{
      menus:[]
    },//选中的当前角色
    roles:[],//角色的路由权限
  }
  constructor(){
    super()
   // 创建一个 ref 来存储 Modal 的 DOM 元素
    this.roleRef=React.createRef()
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        sorter: (a, b) => a.create_time - b.create_time,
        sortDirections: ['descend', 'ascend'],
        render:(auth_time)=>(moment(auth_time).format('YYYY-MM-DD'))
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
        render:(record)=>(<Button type='link' onClick={()=> (this.deleteUser(record))}>删除</Button>)
      },
    ];
  }  
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  roleModal = ()=>{
    // 子组件的showModal
    this.roleRef.current.showModal()
  }
  // 创建角色
  handelAddUser = (e) => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        this.setState({
          confirmLoading: true,
        });
        const res = await reqAddRole(values)
        message.success('添加成功！')
        // const {roles} = this.state
        // roles.push(res.data) //这样会直接修改state的数据，不能这样写
        // 写法一
        // const roles = [...this.state.roles] //新产生一个数组
        // roles.push(res.data)
        // 写法二
        this.setState(state=>({
          roles:[...state.roles,res.data],
          visible: false,
          confirmLoading: false,
        }))
        this.props.form.resetFields()
        // 更新列表
        this.getUserList()
      }else{
        return
      }
    });
  };
  // 删除角色
  deleteUser = async (record)=>{
    this.setState({loading:true})
    const {_id} = record
    const res = await reqDeleteRole({_id})
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
  // 角色列表
  getUserList= async()=>{
    this.setState({
      loading:true
    })
    const res = await reqRoleList()
    const {data} = res
    this.setState({
      loading:false,
      tableData:data
    })
  }
  componentDidMount(){
    this.getUserList()
  }
  // 管理-CheckBox
  rowSelection = ()=> ({
    columnTitle:'管理',
    type:'radio',
    selectedRowKeys:this.state.role['_id'],
    onSelect:(role)=>{
      this.setState({role})
    }
  });
  // table点击事件处理
  tableOnRow= role => {
    return {
      onClick: event => { //点击行
        this.setState({role})
      }, 
    };
  }
  updateMeuns=(role)=>{
    this.setState({
      role
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading,loading,tableData,role} = this.state;
    const cardTitle=(
      <span><Button type="primary" onClick={this.showModal}>创建角色</Button>
      <Button type="primary" onClick={this.roleModal} disabled={!role['_id']} style={{marginLeft:'1rem'}}>设置权限</Button></span>
     )
    return (
      <Card title={cardTitle}>
        <Modal
          title="创建角色"
          visible={visible}
          onOk={this.handelAddUser}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
        <Form onSubmit={this.handelAddUser} className="login-form">
          <Form.Item>
            {getFieldDecorator('roleName', {
              rules: [{ required: true, message: '请输入角色名称!' }],
            })(
              <Input
                prefix={<Icon type="user" style={iconStyle} />}
                placeholder="角色名称"
              />
            )}
          </Form.Item>
      </Form>
      </Modal>
          <AuthModal history={this.props.history} ref={this.roleRef} role={role} getUserList={()=>this.getUserList()}/>
          <Table dataSource={tableData} columns={this.columns} bordered loading={loading} rowKey={'_id'} size={'small'} 
              rowSelection={this.rowSelection()} 
              onRow={this.tableOnRow}
              pagination={{
                  defaultCurrent:1,
                  pageSize:PAGE_SIZE,
                  total:tableData.length
                }}
          />
      </Card>
    )
  }
}
export default (Form.create({ name: 'normal_login' })(User));