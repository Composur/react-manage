import React, { PureComponent } from 'react';
import WrapperDrop from '../DragAndDrop/WrapperDrop.js';
import WrapperDrag from '../DragAndDrop/WrapperDrag.js';

class TextAreaField extends PureComponent {
  render() {
    const {
      dataSet, isDragging, activeField, removeField, draggabled,
    } = this.props;
    const {
      attrInfo: { titleValue, tipValue, verifyValue },
      active,
      cellIndex,
    } = dataSet;

    let status = '';
    if (active) {
      status += ' active';
    }
    if (isDragging) {
      status += ' draging';
    }
    return (
      <div className={`wf-component wf-component-textfield ${status}`} draggable={draggabled}>
        <div
          className="wf-remove icon icon-close"
          onMouseDown={(event) => {
            event.stopPropagation();
            removeField(dataSet, cellIndex);
          }}
        />
        <div
          className="wf-overlay wf-drag"
          onMouseDown={(event) => {
            event.stopPropagation();
            activeField(dataSet, active, cellIndex);
          }}
        />
        <div className="wf-view">
          <div className="wf-field">
            <label className="wf-field-label">{titleValue}</label>
            <span className="wf-field-placeholder">
              {tipValue + (verifyValue ? '（必填）' : '')}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default WrapperDrop(WrapperDrag(TextAreaField));
