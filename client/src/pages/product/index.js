import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import Product from './product'
import ProductAdd from './add'
import ProductDetail from './detail'
export default class  extends Component {
  state = {  }
  render() {
    return (
      <Switch>
        <Route exact path={'/product'}  component={Product}/>
        <Route path={'/product/add'} component={ProductAdd}/>
        <Route path={'/product/detail'} component={ProductDetail}/>
        <Redirect to={'/product'}/>
      </Switch>
    ); 
  }
}