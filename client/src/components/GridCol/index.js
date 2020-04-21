import React, { PureComponent } from "react";
import FieldCorAttr from "../../utils/field-cor-attr.js";
import emitter from "../../directive/dragdropdirective";
import Util from "../../utils/utils-form-design";
import { take } from "rxjs/operators";
import PropTypes from "prop-types";
const emitter$ = emitter;
const data$ = emitter$.getDragData().pipe(take(1));

class GridCol extends PureComponent {
  state = {
    dropTags: this.props.dropTags,
    dragenter: false
  };
  onDragEnter = event => {
    event.stopPropagation();                                    
    event.preventDefault();
    const {
      dataSet: { active },
      cells,
      cellIndex
    } = this.props;
    const { dropTags } = this.props;
    data$.subscribe(dragData => {
      if (dropTags.indexOf(dragData.tag) > -1) {
        const dragType = dragData.type;
        switch (dragType) {
          case "new":
            if (!active) {
              return;
            }
            if (!cells[cellIndex].item) {
              this.setState({ dragenter: true });
            }
            break;
          case "move":
            this.setState({ dragenter: true });
            break;
          default:
             
        }
      }
    });
  };
  onDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  onDragLeave = () => {
    const {
      dataSet: { active },
      cells,
      cellIndex
    } = this.props;
    const { dropTags } = this.state;

    data$.subscribe(dragData => {
      if (dropTags.indexOf(dragData.tag) > -1) {
        const dragType = dragData.type;
        switch (dragType) {
          case "new":
            if (!active) {
              return;
            }
            if (!cells[cellIndex].item) {
              this.setState({ dragenter: false });
            }
            break;
          case "move":
            this.setState({ dragenter: false });
            break;
          default:
        }
      }
    });
  };
  onDrops = event => {
    const {
      dataSet: { active, gridIndex },
      onDropFormLayout,
      cellIndex,
      cells,
      parent,
      cellGridIndex
    } = this.props;
    event.stopPropagation();
    // event.preventDefault();
    const { dropTags } = this.state;
    data$.subscribe(dragData => {
      const tag = dragData.tag;
      if (dropTags.indexOf(tag) > -1) {
        const dragType = dragData.type;
        switch (dragType) {
          case "new":
            if (!active) {
              return;
            }
            if (!cells[cellIndex].item) {
              this.setState({ dragenter: false });
              const baseInfo = Util.deepClone({
                ...FieldCorAttr[dragData.data.type].initValues
              });
              const attrInfo = {
                titleValue: dragData.data.name,
                ...baseInfo
              };
              let item;
              if (parent) {
                item = {
                  ...dragData.data,
                  attrInfo,
                  gridIndex,
                  cellGridIndex,
                  cellIndex
                };
              } else {
                item = { ...dragData.data, attrInfo, gridIndex, cellIndex };
              }

              onDropFormLayout(item);
            }
            break;
          case "move":
            this.setState({ dragenter: false });
            // console.log(dragData.data)
            let srcItem = cells[cellIndex].item ? cells[cellIndex].item : null;
            if (srcItem == null) {
              srcItem = cells[cellIndex];
            }
            // console.log(currentItem)
            onDropFormLayout(dragData.data, srcItem);
            break;
          default:
        }
      }
    });
  };
  render() {
    const { dragenter } = this.state;
    const { children } = this.props;
    return (
      <div
        className={`${dragenter ? "drag-enter" : ""}`}
        onDragEnter={event => this.onDragEnter(event)}
        onDragLeave={event => this.onDragLeave(event)}
        onDrop={event => this.onDrops(event)}
        onDragOver={event => this.onDragOver(event)}
        style={{ height: "100%", display: "flex", flex: 1, minHeight: "50px" }}
      >
        {children}
      </div>
    );
  }
}
GridCol.propTypes = {
  dataSet: PropTypes.object
};
export default GridCol;
