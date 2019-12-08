
import React, { Component } from 'react'
import moment from 'moment';
import { Calendar, Badge,Alert, } from 'antd';

// 提醒事件数据集合
function getListData(value) {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'success', content: '生日！' },
      ];
      break;
      case 20:
      listData = [
        { type: 'warning', content: '打卡！' },
      ];
      break;
    default:
  }
  return listData || [];
}

// 渲染提醒事件
function dateCellRender(value) {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map(item => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

function getMonthData(value) {
  if (value.month() === 8) {
    return '追加的内容';
  }
}

// 自定义渲染月单元格，返回内容会被追加到单元格
function monthCellRender(value) {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>追加的内容</span>
    </div>
  ) : null;
}
export default class  extends Component {
  state = {
    value: moment(),
    selectedValue: moment(),
  };
  onSelect = value => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = value => {
    this.setState({ value });
  };
  componentDidMount(){
    console.log('子组件')
  }
  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
      <Alert
        message={`你选择了: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
      />
      <Calendar value={value} onSelect={this.onSelect} 
      onPanelChange={this.onPanelChange} 
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender} />
    </div>
    );
  }
}

