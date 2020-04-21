import FieldCorAttr from "../../utils/field-cor-attr.js";
import WrapperDrop from "../DragAndDrop/WrapperDrop.js";
import WrapperDrag from "../DragAndDrop/WrapperDrag.js";
import emitter from "../../directive/dragdropdirective";
import { findDOMNode } from "react-dom";
import Util from "../../utils/utils-form-design";
import React, { PureComponent } from "react";
import { fromEvent } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import GridCol from "../GridCol";

class FormLayout extends PureComponent {
  state = {
    dragStart: false
  };
  onDragStart = (event) => {
    event.stopPropagation();
    const {dataSet} = this.props;
    this.setState({
      dragStart: true
    });
    emitter.setDragData({
      tag: dataSet.type,
      type: "move",
      data: dataSet,
      index: dataSet.gridIndex
    });
  };
  onDragEnd = () => {
    this.setState({
      dragStart: false
    });
  };
  onDropFormLayout = (item,srcItem)=> {
    const { onDrop } = this.props;
    // const { active } = dataSet;
    // if (!active) {
    //   return;
    // }
    if (!onDrop) {
      return;
    }
    onDrop(item, srcItem);
  };
  generateField = (data, active, index) => {
    const { onDrop, dataSet, onSave , onDragStart} = this.props;
    const type = data.type;
    return FieldCorAttr[type].showField({
      dataSet: { ...data, active },
      activeField: this.activeFields,
      removeField: this.removeFields,
      onDrop: onDrop,
      parent: dataSet,
      draggabled: true,
      onDragStart,
      onSave,
      dropTags: ["base"],
      cellGridIndex: index
    });
  };
  removeFields = item => {
    const { removeField } = this.props;
    removeField(item);
  };
  activeFields = item => {
    const { activeField } = this.props;
    const active = item.active;
    if (item.type === "grid") {
      activeField(item);
      return;
    }
    if (active) {
      return;
    }
    activeField(item);
  };
  onMouseDown = (event, index) => {
    event.stopPropagation();
    event.preventDefault();
    let { dataSet, onSave } = this.props;
    const currentCell = this.refs['cell'+index];
    const parent = currentCell.parentElement;
    const gridStyle = parent;

    const gridRight = findDOMNode(gridStyle).getBoundingClientRect().right;

    let {
      attrInfo,
      attrInfo: {
        grid: { row, col, rowtem, coltem, cells }
      }
    } = dataSet;
    const leftStyle = getComputedStyle(this.refs["cell" + index]);
    const width0 = parseFloat(leftStyle.getPropertyValue("width"));
    let totalWidth = 0;
    const startX = event.clientX;
    const result$ = fromEvent(window, "mousemove").pipe(
      map(moveEvent => {
        const moveX = moveEvent.clientX;
        const cellcol = [...parent.children];
        totalWidth = Util.getCurrentAndNextCellWidth(cellcol,index);
        if(moveX<gridRight){
          return moveX - startX + width0;
        }
      }),
      takeUntil(fromEvent(window, "mouseup"))
    );
    result$.subscribe(data => {
      const updateAttrInfo = {
        ...attrInfo,
        grid: {
          rowtem,
          row,
          col,
          cells,
          coltem: Util.resetGridRowOrColumn(coltem, index, col, data,totalWidth)
        }
      };
      const updateItem = { ...dataSet, attrInfo: updateAttrInfo };
      onSave(updateItem);
    });
  };
  onDoubleClick = (evnet, index) => {
    let { dataSet, onSave } = this.props;
    let {
      attrInfo,
      attrInfo: {
        grid: { row, col, rowtem, coltem, cells }
      }
    } = dataSet;
    const updateAttrInfo = {
      ...attrInfo,
      grid: {
        rowtem,
        row,
        col,
        cells,
        coltem: Util.resetGridResizerRowOrColumn(coltem, index, col)
      }
    };

    const updateItem = { ...dataSet, attrInfo: updateAttrInfo };
    onSave(updateItem);
  };
  render() {
    const {
      dataSet,
      isDragging,
      activeField,
      removeField,
      draggabled
    } = this.props;
    const { dragStart } = this.state;
    const {
      active,
      attrInfo: {
        grid: { rowtem, coltem, cells, col }
      }
    } = dataSet;
    const GridStyle = {
      display: "grid",
      gridTemplateRows: `${rowtem.join(" ")}`,
      gridTemplateColumns: `${coltem.join(" ")}`
    };
    let status = "";
    if (active) {
      status = status + " active";
    }
    if (isDragging) {
      status = status + " draging";
    }
    return (
      <div
        className={`wf-component wf-component-textfield ${status} ${
          dragStart ? "drag-start" : ""
        }`}
        draggable={draggabled}
        onMouseDown={event => {
          event.stopPropagation();
          activeField(dataSet);
        }}
        onDragStart={event => this.onDragStart(event)}
        onDragEnd={event => this.onDragEnd()}
      >
        <div
          className="wf-remove icon icon-close"
          onMouseDown={event => {
            event.stopPropagation();
            removeField(dataSet);
          }}
        />
        <div style={GridStyle} className="grid" ref="grid">
          {cells.map((item, index) => {
            return (
              <div
                className={`cell ${index < col ? "no-border-top" : ""}`}
                key={index}
                ref={"cell" + index}
              >
                <GridCol
                  onDropFormLayout={(item ,srcItem)=> this.onDropFormLayout(item,srcItem)}
                  cells={cells}
                  cellIndex={index}
                  {...this.props}
                >
                  {item.item
                    ? this.generateField(item.item, item.active, index)
                    : ""}
                </GridCol>
                {(index + 1) % col !== 0 ? (
                  <div
                    className="resizer"
                    onMouseDown={event => this.onMouseDown(event, index)}
                    onDoubleClick={event => {
                      this.onDoubleClick(event, index);
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default WrapperDrop(WrapperDrag(FormLayout));
