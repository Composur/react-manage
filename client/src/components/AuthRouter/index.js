import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from 'prop-types'
import Auth from "../Auth";
export default class AuthRouter extends Component {
  constructor(props) {
    super();
    this.state = {

    };
  }
  render(h) {
    const {path,noCheck} = this.props
    return <Auth permissionPath={path} noCheck={noCheck}>
      <Route {...this.props}/>
    </Auth>;
  }
}
AuthRouter.propTypes={
  path:PropTypes.string,
  noCheck:PropTypes.bool,
}