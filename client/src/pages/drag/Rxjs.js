import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import { Button, Input } from "antd";
import { fromEvent } from "rxjs";
function btn(){
  return (
    <Button>拖动的按钮</Button>
  )
}
export default class RxjsDrag extends PureComponent {
  click = (e) => {
    console.log("one-btn", e);
    fromEvent(findDOMNode(this.btn), "click").subscribe((ee) => {
      console.log("two-btn", ee);
    });
  };
  onMouseDown = (e) => {
    const div = fromEvent(findDOMNode(this.div), "mousemove");
    console.log(div);
  };
  onDragStart = (event)=>{
    event.dataTransfer.setData('text/plain', 'drag info');
  }
  onDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  onDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  onDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain") || 'test';
    const div = document.createElement("div");
    div.textContent = data;
    event.target.appendChild(div);
    
  };
  render() {
    return (
      <>
        <Button draggable={true} 
           onDragStart={this.onDragStart}
          // onDragEnd={this.onDragEnd}
        onClick={(e) => this.click(e)} type="primary">
          拖动到下面红框中
        </Button>
        <Button type="primary" ref={(el) => (this.btn = el)}>
          two
        </Button>
        <div
          // onDragStart={this.onDragStart}
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDrop={(e) => this.onDrop(e)}
          style={{ width: "300px", height: "300px", border: "1px solid red" }}
          onMouseDown={(e) => this.onMouseDown(e)}
          ref={(el) => (this.div = el)}
        >
          onMouseDown
        </div>
      </>
    );
  }
}
