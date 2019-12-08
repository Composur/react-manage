import React,{ Component ,lazy,Suspense} from 'react';
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout,BackTop} from 'antd';
import {connect} from 'react-redux'
import Loadable from 'react-loadable';
import HeaderSelf from 'components/header'
import LeftNav from 'components/left-nav'
import FooterComponent from 'components/footer'
import Loading from 'components/loading'
/**
 * @description 路由懒加载
 * 1. Loadable 的方式 推荐
 * 2. react16.6.x 之后的版本自带lazy,Suspense。实验阶段，不能用于生产
 */
const Home = Loadable({
  loader: () => import('../home/home'),
  loading: Loading,
});
// const Home = lazy(() => import('../home/home'));
const Category = lazy(() => import('../category/category'))
const Role = lazy(() => import('../role/role'))
const User = lazy(() => import('../user/user'))
const Product = lazy(() => import('../product'))
const Line = lazy(() => import('../charts/line'))
const Pie = lazy(() => import('../charts/pie'))
const Bar = lazy(() => import('../charts/bar'))
const GitHub = lazy(() => import('../github'))
const Order = lazy(() => import('../order'))
const NotFoundPage = lazy(() => import('components/404'))


const {Footer, Sider, Content } = Layout;

class Admin extends Component {
  state = {
    collapsed: false,
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const {userInfo} = this.props 
    if(!userInfo._id){
      return <Redirect to='/login'/>
    }
    return (
      <Layout style={{minHeight: '100%'}}>
          <Sider  collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <LeftNav/>
          </Sider>
          <Layout>
            <HeaderSelf/>
            <Content style={{margin:'100px 14px 14px',background:'#fff'}}>
              {/* maxDuration 小于500毫秒 不展示loading 这里不生效 因为异步模式始终是0 */}
              <Suspense fallback={<Loading/>}>
                <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/home' component={Home}/>
                <Route path='/category' component={Category}/>
                <Route path='/product' component={Product}/>
                <Route path='/role' component={Role}/>
                <Route path='/user' component={User}/>
                <Route path='/charts/bar' component={Bar}/>
                <Route path='/charts/line' component={Line}/>
                <Route path='/charts/pie' component={Pie}/>
                <Route path='/order' component={Order}/>
                <Route path='/GitHub' component={GitHub}/>
                <Route component={NotFoundPage}/>
              </Switch>
              </Suspense>
            </Content>
            <Footer style={{textAlign:'center',background:'#fff'}}>
              <FooterComponent/>
            </Footer>
          </Layout>
          <BackTop
           visibilityHeight={100}
          />
      </Layout>
    );
  }
}

const mapStateToProps=(state)=>({
  userInfo:state.loginUserInfo
})

export default connect(mapStateToProps,null)(Admin)