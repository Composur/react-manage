import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: false,
      superAdmin: false
    };
    // 调试字段，为true时表示取消权限控制
    this.cancelPermission = false;
  }
  verification(authLists, permissionPath) {
    if (authLists.indexOf(permissionPath) !== -1) {
      this.setState({
        hasPermission: true
      });
    }
  }
  componentWillMount() {
    const { permissionPath, userInfo } = this.props;
    if (userInfo.username === "admin") {
      this.state.superAdmin = true;
    }
    this.verification(userInfo.role.menus, permissionPath);
  }
  UNSAFE_componentWillReceiveProps({ userInfo }) {
    // if(userInfo.role.menus.length!==this.props.userInfo.role.menus.length){
    //   console.log(124)
    // }
    this.verification(
      userInfo.role.menus,
      this.props.history.location.pathname
    );
  }
  render(h) {
    const { hasPermission, superAdmin } = this.state;
    const { noCheck = false } = this.props;
    return hasPermission || noCheck || superAdmin ? (
      this.props.children
    ) : (
      <div className="noPermission">没有查看该模块的权限</div>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.loginUserInfo
});
export default connect(mapStateToProps, null)(withRouter(Auth));
