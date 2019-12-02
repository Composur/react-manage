import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { setHeadTitle } from './action'
import menuLists from 'config/menuConfig'
import './index.less'

const { SubMenu } = Menu;
class LeftNav extends Component {  
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    };
    this.getCurrentReqParentPath(menuLists,this.props.location.pathname )
  }
  hasAuth=(item)=>{
    const {userInfo} = this.props
    const {username,role} = userInfo
    const {key,isPublic,children} = item
    // 默认admin全部权限 isPublic为基础页面
      if (username === 'admin' || isPublic || role.menus.indexOf(key)!==-1) {
        return true
      }else if(children){
        return !!children.find(item=>role.menus.indexOf(item.key)!==-1)
      }
      return false
  }
  // 保持选中状态
  getCurrentReqParentPath(arr,getCurrentReqPath){
    arr.forEach(element => {
      if(element.children){
        element.children.forEach((cItem)=>{
          if(getCurrentReqPath.includes(cItem.key)){
            // 得到需要展开的key
            this.getCurrentReqParentPath=element.key
          }
        })
      }
    });
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  // 根据导航json格式进行递归渲染
  // 方式一：map
  menuNav_map = (menuConfig) => {
    return menuConfig.map(item => {
      if(item.children){
        return (
          <SubMenu  key={item.key}   title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        >
        { this.menuNav_map(item.children)  }
        </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.key}>
          <Link to={item.key}>
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
        )
      }
    })
  }
  // 方式二：reduce
  menuNav_reduce=(arr)=>{
    const {setHeadTitle} = this.props
    return arr.reduce((pre,item)=>{

      /**
       * @desc 权限控制 
       * @desc 拿到权限列表路由进行渲染
       */
      // 
      if(this.hasAuth(item)){
        if(item.children){
          pre.push(
            <SubMenu  key={item.key}   title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
          { this.menuNav_reduce(item.children)  }
          </SubMenu>
          )
        }else{
        // 刷新页面的时候调用setHeadTitle
          // const {pathname} = this.props.location
          // if (pathname === item.key) {
          //   setHeadTitle(item.title)
          // }
          pre.push(
            <Menu.Item key={item.key}>
            <Link to={item.key} onClick={()=>setHeadTitle(item.title)}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
          )
        }  
      }
      return pre    
    },[])
  }
 
  render() {
    //这样是获取不到的，因为不是路由组件没有经过router的包装
    let getCurrentReqPath=this.props.location.pathname 
    if(getCurrentReqPath.includes('/product')){getCurrentReqPath='/product'}
    const getCurrentReqParentPath=this.getCurrentReqParentPath
    return (
      <div className='left-nav' >

        <Link to='/'>
          <header className='left-nav-header'>
          <h1 className='left-nav-header-content'>管理系统</h1>
          </header>
        </Link>
        
        <Menu mode="inline" theme="dark" selectedKeys={[getCurrentReqPath]}
         defaultOpenKeys={[getCurrentReqParentPath]}
         >
          {this.menuNav_reduce(menuLists)}
        </Menu>

      </div>
    );
  }
}
LeftNav.propTypes={
  setHeadTitle:PropTypes.func.isRequired,
  userInfo:PropTypes.object.isRequired,
}
// 该回调函数必须返回一个纯对象
const mapStateToProps=(state)=>({
  userInfo:state.loginUserInfo
})
const mapDispatchToProps=(dispatch)=>({
  setHeadTitle:(title)=>{
    dispatch(setHeadTitle(title))
  }
})

// 高阶组件
// 新的组件向非路由组件传递history、match、location
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LeftNav))