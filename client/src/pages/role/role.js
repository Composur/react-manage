import React, { Component } from 'react';
import {Card} from 'antd'
export default class  extends Component {
  state = {  }
  render() {
    return (
      <Card title="Default size card" extra={<a href="#">More</a>}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    );
  }
}