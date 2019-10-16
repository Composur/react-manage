import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import store from '../../utils/storeUtils'
export default class Admin extends Component {
  state = {  }
  render() {
    if(!store.user){
      return  <Redirect to='/login'/>
    }
    return (
      <div>hello{store.user.username}</div>
    );
  }
}