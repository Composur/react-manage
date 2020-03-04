import React, { Component } from 'react';
import { List, Typography } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const maskStyle = {
  position:'fixed',
  left:0,
  right:0,
  top:0,
  bottom:0,
  backgorund:'rgba(0,0,0,0.5)'
}

const move = (arr=[],startIndex,toIndex)=>{
  arr = arr.slice()
  arr.splice(toIndex,0,arr.splice(startIndex,1))
  return arr;
}
const lineHeight = 42 
export default class Drag extends Component{
  state={
    list:data,
    dragging:false,
    draggingIndex:-1,
    startPageY:0,
    offsetPageY:0
  }
  // 点击的时候记录 Y 轴的位置 
  drag = (e,index) => {
    console.log('dragging',e.pageY,index)
    this.setState({
      dragging:true,
      draggingIndex:index,
      currentPageY:e.pageY,
      startPageY:e.pageY,
    })
  }
  onMouseUp = (e) => {
    this.setState({
      dragging:false,
      startPageY:0,
      draggingIndex:-1
    })
  }
  onMouseMove = (e) => {
   
   let offset = e.pageY - this.state.startPageY
   const draggingIndex = this.state.draggingIndex
   console.log('move',offset)
   if (offset > lineHeight && draggingIndex < this.state.list.length) {
     //  向下移动
     offset -= lineHeight
     this.setState({
       list: move(this.state.list, draggingIndex, draggingIndex + 1),
       draggingIndex: draggingIndex + 1,
       startPageY: this.state.startPageY + lineHeight
     })
   } else if (offset < -lineHeight && draggingIndex > 0) {
     offset += lineHeight
     this.setState({
       list: move(this.state.list, draggingIndex, draggingIndex - 1),
       draggingIndex: draggingIndex - 1,
       startPageY: this.state.startPageY - lineHeight
     })
   }
   this.setState({offsetPageY:offset})
  }
  getDraggingStyle = (index)=>{
    if(index!== this.state.draggingIndex) return
    return {
      backgorundColor:'#eee',
      transform:`translate(10px,${this.state.offsetPageY}px)`,
      opacity:0.5
    }
  }
  render(){
    return (
      <div>
        <h3 style={{ marginBottom: 16 }}>Default Size</h3>
        <List 
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.state.list}
          renderItem={ (item,index) => (
            <List.Item onMouseDown={(e)=>this.drag(e,index)} key={item}
              style = {this.getDraggingStyle(index)}
            >
             {item}
            </List.Item>
          )}
        />
        {
            this.state.dragging && (
              <div 
              style={maskStyle}
              onMouseUp = {e=>this.onMouseUp(e)}
              onMouseMove = {e=>this.onMouseMove(e)}
              >
              </div>
            )
          }
      </div>
    )
  }  
}
