import React, { Component} from 'react';
import PropTypes from 'prop-types'
import {Modal,Tree,Input,Form,Icon,message} from 'antd'
import store from '../../utils/storeUtils'
import {reqSettingRole} from 'api'
import menuList from 'config/menuConfig'
const iconStyle={ color: 'rgba(0,0,0,.25)' }
const { TreeNode } = Tree;
 class Auth extends Component {
  state = { 
    visible:false,
    confirmLoading:false,
    menus:[],//路由权限
   }
   showModal=()=>{
     this.setState({
       visible:true
     })
   }
  //  设置权限
   handelAddUser= async ()=>{
    this.setState({
      confirmLoading:true
    })
    const {role}= this.props
    role.menus=this.state.menus  //自动更新了父组件的状态，改变了props的状态
    const {username,role_id} = store.get('user_key')
    role.auth_name = username
    const res = await reqSettingRole(role)
    if(res){
      message.success('更新成功！')
      // 如果用户更新的是自己的权限，重新登录
      if(role._id===role_id){
        store.user=null
        store.clearAll()
        // 在这里还需要reset redux 上的数据
        // this.props.logout()
        this.props.history.replace('/login')
      }else {
        this.setState({
          confirmLoading:false,
          visible:false,
        })
        this.props.getUserList()
      }
    }
   }
   handleCancel=()=>{
    this.setState({
      visible:false,
      confirmLoading:false,
      menus:this.props.role.menus
    })
   }

  /**
   * @description menus 得到checkbox选中的集合
   * @description info 点击事件
   */
  // 更新了menus
  onCheck = (menus, info) => {
    this.setState({menus})
  };
  // 权限控件渲染
  treeNodeRender=(menuList)=>(
    menuList.map(item=>{
        return (
          <TreeNode title={item.title} key={item.key}>
            { item.children?this.treeNodeRender(item.children):null}
          </TreeNode>
         )
    })
  )
  componentDidMount() {
    this.treeNodes=this.treeNodeRender(menuList)
  }
  // 这个方法已经不建议使用
  UNSAFE_componentWillReceiveProps(next){
    this.setState({
      menus:next.role.menus
    })
  }
  // shouldComponentUpdate(nextProps,nextState){
  //   // 比较新旧props和state的数据
  //   // if( this.props.role===nextProps.role || this.state.menus===nextState.menus){
  //   //   return false
  //   // }
  //   return true
  // }
  render() {
    // 每次需要拿到最新的role
    const {role} = this.props 
    const {visible,confirmLoading,menus} = this.state
    return (
      <Modal
        title="设置权限"
        visible={visible}
        onOk={this.handelAddUser}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        okText="确认"
        cancelText="取消"
        centered
        bodyStyle={{overflow:'auto'}}
      >
      <Form.Item label='角色名称' labelCol={{sm:4}} wrapperCol={{sm:16}}>
          <Input prefix={<Icon type="user" style={iconStyle}/>} disabled value={role.name}/>
     </Form.Item>
        <Tree
          checkable
          // defaultExpandAll
          defaultExpandedKeys={['all']}
          checkedKeys={menus}
          onCheck={this.onCheck}
        >
          <TreeNode title="权限管理" key="all">
           {this.treeNodes }
          </TreeNode>
       </Tree>
    </Modal>
    );
  }
}
Auth.propTypes={
  role:PropTypes.object.isRequired,
}

export default Auth