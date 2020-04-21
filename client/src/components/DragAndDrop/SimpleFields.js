import React, { Component } from "react";
import WrapperDrag from "./WrapperDrag.js";

class SimpleFields extends Component {
  render() {
    const { isDragging, dataSet } = this.props;
    return (
      <div
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move"
        }}
      >
        <div className="wf-widgetsitem">
          <label>{dataSet.name}</label>
          <img className="widgeticon" src={dataSet.url} alt="图片" />
        </div>
      </div>
    );
  }
}
export default WrapperDrag(SimpleFields);
