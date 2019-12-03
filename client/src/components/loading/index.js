import React, { Component } from 'react';
import { Spin } from 'antd';

export default class  extends Component {
  state = {  }
  
  render() {
    return (
     <div style={{textAlign:'center',marginTop:'10%'}}>
      <Spin tip="努力加载中..." size='large'/>
     </div>
    );
  }
}