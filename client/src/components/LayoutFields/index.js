import React, { Component } from "react";
import WrapperDrag from "../DragAndDrop/WrapperDrag.js";

class LayoutFields extends Component {
  render() {
    const {dataSet ,dragStart,draggable} = this.props;
    return (
      // <div
      //   // style={{
      //   //   opacity: isDragging ? 0.5 : 1,
      //   //   cursor: "move"
      //   // }}
      //   style={{overflow:'hidden'}}
      // >
        <div className={`wf-widgetsitem ${dragStart?'drag-start':''}`} draggable={draggable}>
          <label>{dataSet.name}</label>
          <img className="widgeticon" src={dataSet.url} alt="图片"  draggable={false}/>
        </div>
      //</div>
    );
  }
}
export default WrapperDrag(LayoutFields, "grid");
