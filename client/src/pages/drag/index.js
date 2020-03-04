import React, { Component } from 'react';
import { List } from 'antd';

const data = [];
for (let i = 0; i < 5; i++) {
  data.push(`item${i}`)
}

const maskStyle = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgorund: 'rgba(0,0,0,0.5)'
}
// 从新计算数组
const move = (arr = [], startIndex, toIndex) => {
  arr = arr.slice()
  arr.splice(toIndex, 0, arr.splice(startIndex, 1))
  return arr;
}
const lineHeight = 42
export default class Drag extends Component {
  state = {
    list: data,
    dragging: false,
    draggingIndex: -1,
    startPageY: 0,
    offsetPageY: 0
  }
  // 点击的时候记录 Y 轴的位置 
  dragging = (e, index) => {
    this.setState({
      dragging: true,
      draggingIndex: index,
      currentPageY: e.pageY,
      startPageY: e.pageY,
    })
  }
  // 松开鼠标的时候，从新初始化 startPageY、draggingIndex,
  onMouseUp = (e) => {
    this.setState({
      dragging: false,
      startPageY: 0,
      draggingIndex: -1
    })
  }
  // 移动的轨迹
  onMouseMove = (e) => {
    let offset = e.pageY - this.state.startPageY
    const draggingIndex = this.state.draggingIndex
    if (offset > lineHeight && draggingIndex < this.state.list.length) {
      //  向下移动
      offset -= lineHeight
      // move 期间，state 的数据是动态变化的，draggingIndex 始终比上一个多 1
      this.setState({
        list: move(this.state.list, draggingIndex, draggingIndex + 1), // 按照移动的方向进行数据交换
        draggingIndex: draggingIndex + 1,
        startPageY: this.state.startPageY + lineHeight
      })
    } else if (offset < -lineHeight && draggingIndex > 0) {
      // 向上移动
      offset += lineHeight
      this.setState({
        list: move(this.state.list, draggingIndex, draggingIndex - 1),
        draggingIndex: draggingIndex - 1,
        startPageY: this.state.startPageY - lineHeight
      })
    }
    // item 移动的距离
    this.setState({ offsetPageY: offset })
  }
  // 移动动画
  getDraggingStyle = (index) => {
    if (index !== this.state.draggingIndex) return
    return {
      backgorundColor: '#eee',
      transform: `translate(10px,${this.state.offsetPageY}px)`,
      opacity: 0.5
    }
  }
  render() {
    return (
      <div>
        <h2>原生事件实现拖动组件</h2>
        <List
          header={<div>列表头部</div>}
          footer={<div>列表尾部</div>}
          bordered
          dataSource={this.state.list}
          renderItem={(item, index) => (
            <List.Item onMouseDown={(e) => this.dragging(e, index)} key={item}
              style={this.getDraggingStyle(index)}
            >
              {item}
            </List.Item>
          )}
        />
        {/* 用一个遮罩监听事件，也可以监听整个 document */}
        {
          this.state.dragging && (
            <div
              style={maskStyle}
              onMouseUp={e => this.onMouseUp(e)}
              onMouseMove={e => this.onMouseMove(e)}
            >
            </div>
          )
        }
      </div>
    )
  }
}
