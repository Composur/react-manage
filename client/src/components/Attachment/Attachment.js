import React, { PureComponent } from "react";
import WrapperDrop from "../DragAndDrop/WrapperDrop.js";
import WrapperDrag from "../DragAndDrop/WrapperDrag.js";

class Attachment extends PureComponent {
  render() {
    const { dataSet, isDragging, activeField, removeField ,draggabled} = this.props;
    const {
      attrInfo: { titleValue = "附件", verifyValue = false },
      active,
      cellIndex
    } = dataSet;

    let status = "";
    if (active) {
      status = status + " active";
    }
    if (isDragging) {
      status = status + " draging";
    }
    return (
      <div className={`wf-component wf-component-textfield ${status}`} draggable={draggabled}>
        <div
          className="wf-remove icon icon-close"
          onMouseDown={event => {
            event.stopPropagation();
            removeField(dataSet,cellIndex);
          }}
        />
        <div
          className="wf-overlay wf-drag"
          onMouseDown={event => {
            event.stopPropagation();
            activeField(dataSet,active,cellIndex);
          }}
        />
        <div className="wf-view">
          <div className="wf-field">
            <label className="wf-field-label">{titleValue}</label>
            <span className="wf-field-placeholder">
              附件{verifyValue ? "（必选）" : ""}
            </span>
            <i className="icon icon-chakanfujian" />
          </div>
        </div>
      </div>
      
    );
  }
}

export default WrapperDrop(WrapperDrag(Attachment));
