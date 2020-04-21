import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import "./index.scss";
import { take } from "rxjs/operators";
import DropContainer from "../../../components/DragAndDrop/DropContainer.js";
import BaseFields from "../../../components/BaseFields";
import { Collapse } from "antd";
import LayoutFields from "../../../components/LayoutFields";
import FieldCorAttr from "../../../utils/field-cor-attr";
import Util from "../../../utils/utils-form-design";
import emitter from "../../../directive/dragdropdirective";
const emitter$ = emitter;
const data$ = emitter$.getDragData().pipe(take(1));
const Panel = Collapse.Panel;

export default class FormDesign extends PureComponent {
  constructor(props) {
    super(props);
    const canvasItems = this.props.fieldsData;
    this.state = {
      originItems: { baseItems: Util.baseItems, layoutItems: Util.layoutItems },
      canvasItems,
      activeItem: null,
      currentDropIndex: -2,
      dropTags: ["grid"]
    };
  }
  onChangeDropIndex = index => {
    if (this.state.currentDropIndex === index) {
      return;
    }
    this.setState({ currentDropIndex: index });
  };
  updateGridState = item => {
    this.setState(
      prevState => {
        const canvasItems = [...prevState.canvasItems];
        Util.resetArrayActive(canvasItems);
        Util.resetAllGridCellGridCellActice(canvasItems);
        Util.addCanvasItem(canvasItems, this.state.currentDropIndex, item);
        Util.addArrayIndex(canvasItems);
        Util.resetArrayCellGridIndex(canvasItems);
        const activeItem = Util.getActiveItem(canvasItems);
        return {
          activeItem,
          currentDropIndex: -2,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  };
  updateGridIndexGridState = item => {
    this.setState(
      prevState => {
        const gridIndex = item.gridIndex;
        const cellIndex = item.cellIndex;
        const canvasItems = [...prevState.canvasItems];
        Util.resetArrayActive(canvasItems);
        Util.resetAllGridCellGridCellActice(canvasItems);
        Util.activeIndex(canvasItems, gridIndex);
        Util.addcellGridcellGridIndex(item);
        Util.addCellItem(canvasItems, gridIndex, cellIndex, item);
        Util.activeIndex(canvasItems[gridIndex].attrInfo.grid.cells, cellIndex);
        const activeItem = Util.getCellActiveItem(
          canvasItems,
          gridIndex,
          cellIndex
        );
        Util.addCellItemGridIndex(activeItem, gridIndex);
        return {
          activeItem,
          currentDropIndex: -2,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  };
  onDrop = (item, srcItem) => {
    const cellIndex = item.cellIndex;
    const cellGridIndex = item.cellGridIndex;
    data$.subscribe(dragData => {
      if (this.state.dropTags.indexOf(dragData.tag) > -1) {
        if (cellIndex === undefined) {
          this.updateGridState(item);
        } else {
          if (srcItem !== undefined) {
            this.swapItem(item, srcItem);
            return;
          }
          this.updateGridIndexGridState(item);
        }
      } else {
        if (srcItem !== undefined) {
          if (
            cellGridIndex === undefined &&
            srcItem.cellGridIndex === undefined
          ) {
            this.swapItem(item, srcItem);
            return;
          } else if (
            item.cellGridIndex !== undefined &&
            srcItem.cellGridIndex !== undefined
          ) {
            this.swapcellGridItem(item, srcItem);
            return;
          } else if (srcItem.cellGridIndex !== undefined) {
            this.swapCellBaseItem2CellGridBaseItem(item, srcItem);
            return;
          } else if (srcItem.cellGridIndex === undefined) {
            this.swapCellGridBaseItem2CellBaseItem(item, srcItem);
            return;
          }
        }
        // if(item.type!=='gird'&&srcItem === undefined){
        //   return 
        // }
        if (cellIndex!==undefined&&cellGridIndex === undefined) {
          this.updateBaseState(item);
        } else if(cellGridIndex!==undefined) {
          this.updateGridCellGridBase(item);
        }
      }
    });
  };
  swapCellBaseItem2CellGridBaseItem(item, srcItem) {
    this.setState(
      prevState => {
        let canvasItems = [...prevState.canvasItems];
        const gridIndex = item.gridIndex;
        const cellGridIndex = srcItem.cellGridIndex;
        Util.swapCellBaseItem2CellGridBaseItem(
          canvasItems,
          gridIndex,
          cellGridIndex,
          item,
          srcItem
        );
        Util.resetCellGridIndexandCellItemIndex(canvasItems, gridIndex);
        return {
          currentDropIndex: -2,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  }
  swapCellGridBaseItem2CellBaseItem(item, srcItem) {
    this.setState(
      prevState => {
        let canvasItems = [...prevState.canvasItems];
        const gridIndex = item.gridIndex;
        const cellGridIndex = item.cellGridIndex;
        Util.swapCellGridBaseItem2CellBaseItem(
          canvasItems,
          gridIndex,
          cellGridIndex,
          item,
          srcItem
        );
        Util.resetCellGridIndexandCellItemIndex(canvasItems, gridIndex);
        return {
          currentDropIndex: -2,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  }
  swapcellGridItem(item, srcItem) {
    this.setState(
      prevState => {
        let canvasItems = [...prevState.canvasItems];
        const gridIndex = item.gridIndex;
        const cellGridIndex = item.cellGridIndex;
        Util.swapCellGridItem(
          canvasItems,
          gridIndex,
          cellGridIndex,
          item,
          srcItem
        );
        // Util.resetcellGridCellsIndex(canvasItems, gridIndex, cellGridIndex);
        Util.resetCellGridIndexandCellItemIndex(canvasItems,gridIndex)  
        return {
          currentDropIndex: -2,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  }
  swapItem(item, srcItem) {
    this.setState(
      prevState => {
        let canvasItems = [...prevState.canvasItems];
        const gridIndex = item.gridIndex;
        Util.swapItem(canvasItems, gridIndex, item, srcItem);
        // Util.resetCellsIndex(canvasItems, gridIndex);
        Util.resetCellGridIndexandCellItemIndex(canvasItems,gridIndex)
        return {
          currentDropIndex: -2,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.fieldsData !== this.props.fieldsData) {
      const canvasItems = nextprops.fieldsData;
      this.setState({ canvasItems: nextprops.fieldsData }, () => {
        this.saveToOuter(canvasItems);
      });
    }
  }
  updateGridCellGridBase(item) {
    this.setState(
      prevState => {
        let canvasItems = [...prevState.canvasItems];
        const gridIndex = item.gridIndex;
        const cellGridIndex = item.cellGridIndex;
        const cellIndex = item.cellIndex;
        Util.resetGridCellGridCellActive(
          canvasItems,
          gridIndex,
          cellGridIndex,
          cellIndex
        );
        Util.addGridCellGridBaseItem(
          canvasItems,
          gridIndex,
          cellGridIndex,
          cellIndex,
          item
        );
        const activeItem = Util.getGridCellGridCellActiveItem(
          canvasItems,
          gridIndex,
          cellGridIndex,
          cellIndex
        );
        return {
          currentDropIndex: -2,
          activeItem,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  }
  updateBaseState(item, srcItem) {
    this.setState(
      prevState => {
        let canvasItems = [...prevState.canvasItems];
        const gridIndex = item.gridIndex;
        const cellIndex = item.cellIndex;
        const active = item.active;
        if (cellIndex !== undefined) {
          if (!active) {
            if (Util.isgridCellHascellItem(canvasItems, gridIndex, cellIndex)) {
              return;
            }
          }
        }
        Util.resetCellActive(canvasItems, gridIndex, cellIndex);
        Util.resetAllGridCellGridCellActice(canvasItems);
        Util.addCellItem(canvasItems, gridIndex, cellIndex, item);
        const activeItem = Util.getCellActiveItem(
          canvasItems,
          gridIndex,
          cellIndex
        );
        Util.addCellItemGridIndex(activeItem, gridIndex);
        return {
          currentDropIndex: -2,
          activeItem,
          canvasItems
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
        //用该函数来监听渲染是否完成
      }
    );
  }
  //文本块dragover事件
  FieldDragOver = (event, dataSet, comp) => {
    data$.subscribe(dragData => {
      if (this.state.dropTags.indexOf(dragData.tag) > -1) {
        this.moveLayout(event, dataSet, comp);
      }
    });
  };
  moveLayout = (event, dataSet, comp) => {
    if (dataSet) {
      //排序时在容器内item项上移动
      const hoverBoundingRect = findDOMNode(comp).getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverClientY = event.clientY - hoverBoundingRect.top;
      const index = dataSet.gridIndex;
      if (hoverClientY <= hoverMiddleY) {
        this.onChangeDropIndex(index - 1);
      } else {
        this.onChangeDropIndex(index);
      }
    }
  };
  //容器dragover事件
  containerDragOver = event => {
    if (event.target.className === "wf-formcanvas-layout-inner") {
      const itemNodes = event.target.children;
      const len = itemNodes.length;
      if (len >= 1) {
        const BoundingLastChild = findDOMNode(
          itemNodes[len - 1]
        ).getBoundingClientRect();

        if (event.clientY > BoundingLastChild.bottom) {
          this.onChangeDropIndex(len - 1);
        }
      } else {
        this.onChangeDropIndex(-1);
      }
    }
  };
  //鼠标离开容器事件
  containerDragleave = (event, comp) => {
    this.onChangeDropIndex(-2);
    // const hoverBoundingRect = findDOMNode(comp).getBoundingClientRect();
    // if (
    //   event.clientY > hoverBoundingRect.bottom ||
    //   event.clientY < hoverBoundingRect.top ||
    //   event.clientX < hoverBoundingRect.left ||
    //   event.clientX > hoverBoundingRect.right
    // ) {
    //   this.onChangeDropIndex(-2);
    // }
  };
  generateField = () => {
    const { canvasItems, currentDropIndex } = this.state;
    return canvasItems.map((item, index) => {
      return FieldCorAttr[item.type].showField({
        dataSet: { ...item },
        key: index,
        gridIndex: index,
        currentDropIndex,
        draggabled: true,
        dropTags: ["base", "grid"],
        onSave: this.saveData,
        moveField: this.moveField,
        removeField: this.removeField,
        activeField: this.activeField,
        onDragOver: this.FieldDragOver,
        onDrop: this.onDrop
      });
    });
  };
  activeField = item => {
    if (item.type !== "grid") {
      this.setState(
        prevState => {
          let canvasItems = [...prevState.canvasItems];
          const gridIndex = item.gridIndex;
          const cellGridIndex = item.cellGridIndex;
          const cellIndex = item.cellIndex;
          const active = item.active;
          let activeItem;
          if (cellGridIndex === undefined) {
            Util.resetArrayActive(canvasItems);
            Util.activeIndex(canvasItems, gridIndex);
            Util.activeIndex(
              canvasItems[gridIndex].attrInfo.grid.cells,
              cellIndex
            );
            Util.resetAllGridCellGridCellActice(canvasItems);
            activeItem = Util.getCellActiveItem(
              canvasItems,
              gridIndex,
              cellIndex
            );
            return { activeItem };
          }
          if (cellGridIndex !== undefined) {
            if (!active) {
              Util.resetArrayActive(canvasItems);
              Util.resetCellActive(canvasItems, gridIndex, cellGridIndex);
              Util.resetGridCellGridCellActive(
                canvasItems,
                gridIndex,
                cellGridIndex,
                cellIndex
              );
              Util.activeIndex(canvasItems, gridIndex);
              Util.activeIndex(
                canvasItems[gridIndex].attrInfo.grid.cells[cellGridIndex].item
                  .attrInfo.grid.cells,
                cellIndex
              );
              activeItem = Util.getGridCellGridCellActiveItem(
                canvasItems,
                gridIndex,
                cellGridIndex,
                cellIndex
              );
              return {
                activeItem
              };
            }
          }
        },
        () => {
          this.saveToOuter(this.state.canvasItems);
        }
      );
    } else {
      this.setState(
        prevState => {
          let canvasItems = [...prevState.canvasItems];
          Util.resetArrayActive(canvasItems);
          let activeItem;
          const gridIndex = item.gridIndex;
          const cellIndex = item.cellIndex;
          if (cellIndex !== undefined) {
            Util.activeIndex(canvasItems, gridIndex);
            Util.resetAllGridCellGridCellActice(canvasItems);
            Util.activeIndex(
              canvasItems[gridIndex].attrInfo.grid.cells,
              cellIndex
            );
            activeItem = Util.getCellActiveItem(
              canvasItems,
              gridIndex,
              cellIndex
            );
            return { canvasItems, activeItem };
          }
          Util.resetAllGridCellGridCellActice(canvasItems);
          Util.activeIndex(canvasItems, gridIndex);
          activeItem = Util.getActiveItem(canvasItems);
          return { canvasItems, activeItem };
        },
        () => {
          this.saveToOuter(this.state.canvasItems);
        }
      );
    }
  };
  removeField = item => {
    if (item.type !== "grid") {
      this.setState(
        prevState => {
          const canvasItems = [...prevState.canvasItems];
          const gridIndex = item.gridIndex;
          const cellGridIndex = item.cellGridIndex;
          const cellIndex = item.cellIndex;
          const active = item.active;
          let activeItem;
          if (cellGridIndex !== undefined) {
            if (!active) {
              Util.updateGridCellGridBaseItem(
                canvasItems,
                gridIndex,
                cellGridIndex,
                cellIndex,
                null
              );
              return { canvasItems };
            }
            Util.updateGridCellGridBaseItem(
              canvasItems,
              gridIndex,
              cellGridIndex,
              cellIndex,
              null
            );
            activeItem = Util.getCellActiveItem(
              canvasItems,
              gridIndex,
              cellGridIndex
            );
            return {
              canvasItems,
              activeItem
            };
          }
          if (cellIndex !== undefined) {
            if (!active) {
              Util.updateCurrentCellItem(
                canvasItems,
                gridIndex,
                cellIndex,
                null
              );
              return { canvasItems };
            } else {
              Util.updateCurrentCellItem(
                canvasItems,
                gridIndex,
                cellIndex,
                null
              );
              activeItem = Util.getActiveItem(canvasItems);
              return {
                canvasItems,
                activeItem
              };
            }
          }

          if (!item.active) {
            return {
              canvasItems
            };
          } else {
            activeItem = canvasItems[gridIndex];
            return {
              canvasItems,
              activeItem
            };
          }
        },
        () => {
          this.saveToOuter(this.state.canvasItems);
        }
      );
    } else {
      this.setState(
        prevState => {
          const canvasItems = [...prevState.canvasItems];
          const gridIndex = item.gridIndex;
          const cellIndex = item.cellIndex;
          const active = item.active;
          let activeItem;
          if (cellIndex !== undefined) {
            if (!active) {
              Util.updateCurrentCellItem(
                canvasItems,
                gridIndex,
                cellIndex,
                null
              );
              return {
                canvasItems
              };
            } else {
              Util.updateCurrentCellItem(
                canvasItems,
                gridIndex,
                cellIndex,
                null
              );
              activeItem = Util.getActiveItem(canvasItems);
              return {
                canvasItems,
                activeItem
              };
            }
          }
          canvasItems.splice(gridIndex, 1);
          // Util.addArrayIndex(canvasItems);
          Util.resetAllGridIndexandCellItemIndex(canvasItems)
          if (!active) {
            return {
              canvasItems
            };
          } else {
            activeItem = null;
            return {
              canvasItems,
              activeItem
            };
          }
        },
        () => {
          this.saveToOuter(this.state.canvasItems);
        }
      );
    }
  };
  moveField = (dragIndex, curIndex) => {
    if (dragIndex === curIndex) {
      this.setState({
        currentDropIndex: -2
      });
      return;
    }
    this.setState(
      prevState => {
        const canvasItems = [...prevState.canvasItems];
        canvasItems.splice(curIndex, 0, ...canvasItems.splice(dragIndex, 1));
        Util.resetArrayCellActive(canvasItems);
        Util.resetAllGridCellGridCellActice(canvasItems);
        Util.addArrayIndex(canvasItems);
        Util.resetArrayCellGridIndex(canvasItems);
        const activeItem = Util.getActiveItem(canvasItems);
        return {
          canvasItems,
          currentDropIndex: -2,
          activeItem
        };
      },
      () => {
        this.saveToOuter(this.state.canvasItems);
      }
    );
  };
  saveData = item => {
    if (item.type !== "grid") {
      this.setState(
        prevState => {
          const canvasItems = [...prevState.canvasItems];
          const gridIndex = item.gridIndex;
          const cellGridIndex = item.cellGridIndex;
          const cellIndex = item.cellIndex;
          const activeItem = item;
          if (cellGridIndex === undefined) {
            Util.updateCurrentCellItem(canvasItems, gridIndex, cellIndex, item);
            return { canvasItems, activeItem };
          }
          Util.updateGridCellGridBaseItem(
            canvasItems,
            gridIndex,
            cellGridIndex,
            cellIndex,
            item
          );
          return {
            canvasItems,
            activeItem
          };
        },
        () => {
          this.saveToOuter(this.state.canvasItems);
        }
      );
    } else {
      this.setState(
        prevState => {
          const canvasItems = [...prevState.canvasItems];
          const gridIndex = item.gridIndex;
          const cellIndex = item.cellIndex;
          let activeItem;
          if (cellIndex !== undefined) {
            Util.addcellGridcellGridIndex(item);
            Util.updateCurrentCellItem(canvasItems, gridIndex, cellIndex, item);
            activeItem = Util.getCellActiveItem(
              canvasItems,
              gridIndex,
              cellIndex
            );
            return { canvasItems, activeItem };
          }
          Util.updateCurrentCanvasItem(canvasItems, gridIndex, item);
          activeItem = Util.getActiveItem(canvasItems);
          return { canvasItems, activeItem };
        },
        () => {
          this.saveToOuter(this.state.canvasItems);
        }
      );
    }
  };
  saveToOuter = canvasItems => {
    const fieldsData = canvasItems;
    this.props.onSave(fieldsData);
  };
  render() {
    const { activeItem, currentDropIndex } = this.state;
    return (
      <div className="fd-content">
        <div className="wf-panel wf-widgetspanel ">
          <Collapse defaultactiveId={["1", "2"]}>
            <Panel header="布局组件" key="1">
              {Util.layoutItems.map((item, index) => {
                return (
                  <LayoutFields
                    className="no-margin-bottom"
                    dataSet={item}
                    key={index}
                    onDragEnd={this.onDragEnd}
                    onDragStart={this.onDragStart}
                  />
                );
              })}
            </Panel>
            <Panel header="基础组件" key="2">
              {Util.baseItems.map((item, index) => {
                return (
                  <BaseFields
                    dataSet={item}
                    key={index}
                    onDragStart={this.onDragStart}
                  />
                );
              })}
            </Panel>
          </Collapse>
        </div>
        <div className="wf-formcanvas">
          <div className="wf-formcanvas-layout">
            <DropContainer
              onDrop={this.onDrop}
              onDragLeave={this.containerDragleave}
              onDragOver={this.containerDragOver}
              currentDropIndex={currentDropIndex}
              moveField={this.moveField}
            >
              {this.generateField()}
            </DropContainer>
          </div>
        </div>
        <div className="wf-right">
          {activeItem
            ? FieldCorAttr[activeItem.type].showAttr({
                onSave: this.saveData,
                activeItem
              })
            : ""}
        </div>
      </div>
    );
  }
}
FormDesign.propTypes = {
  className: PropTypes.string,
  height: PropTypes.string,
  onSave: PropTypes.func
};
