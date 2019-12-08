import React, { Component } from 'react';
import { Card } from 'antd';
import Calendar from './ calendar'
const tabList = [
  {
    key: 'tab1',
    tab: '日历',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];

const contentList = {
  tab1: <Calendar/>,
  tab2: <p>content2</p>,
};

export default class order extends Component {
  state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };
  componentDidMount(){
    console.log('父')
  }
  render() {
    return (
      <Card
          style={{ width: '100%' }}
          title='测试页面'
          extra={'预留'}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>
    );
  }
}