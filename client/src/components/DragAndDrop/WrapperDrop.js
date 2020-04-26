import React, { PureComponent, Fragment } from "react";
import emitter from "../../directive/dragdropdirective";
import { take } from "rxjs/operators";
const emitter$ = emitter;
const data$ = emitter$.getDragData().pipe(take(1));//发出接收源最初的一个值
// 定义-释放区域的高阶组件
export default function WrapperDrop(Component) {
  return class DropElement extends PureComponent {
    // 设置被释放区域-拖拽元素携带的信息
    onDragStart = event => {
      event.stopPropagation();

      const {dataSet} = this.props;
      const tag = dataSet.type ==='grid'?dataSet.type:'base';
      emitter$.setDragData({
        tag: tag,
        type: "move",
        data: dataSet,
        index: dataSet.gridIndex
      });
    }
    // 定义被释放区域，需要先绑定 onDragEnter、onDragOver 并且阻止默认事件
    onDragEnter = event =>{
      event.preventDefault();
      event.stopPropagation();
    }
    onDragOver = event => {
      event.preventDefault();
      event.stopPropagation();
      const { onDragOver } = this.props;
      if (onDragOver) {
        data$.subscribe(dragData => {
          if (dragData.tag !== "base") {
            onDragOver(event, this.props.dataSet, this.containerComp);
          }
        });
      }
    };
    onDragLeave = event => {
      const { onDragLeave } = this.props;
      if (onDragLeave) {
        data$.subscribe(dragData => {
          if (dragData.tag !== "base") {
            onDragLeave(event, this.containerComp);
          }
        });
      }
    };
    //数组项内排序
    moveJudge = (index) => {
      const { moveField} = this.props;
      const dragIndex = index;
      const curIndex = this.props.currentDropIndex;
      if (curIndex >= dragIndex) {
        //往下拖拽
        if(!moveField){
          return 
        }
        moveField(dragIndex, curIndex);
      } else {
        if(!moveField){
          return 
        }
        moveField(dragIndex, curIndex + 1);
        //往上拖拽
      }
    };
    //放入的组件-插入新项并排序
    dropJudge = data => {
      const { onDrop } = this.props;
      if (!onDrop) {
        return;
      }
      onDrop(data);
    };
    // drop  事件中获取元素携带的信息，并进行展示
    onDrop = event => {
      event.preventDefault();
      event.stopPropagation();
      data$.subscribe(dragData => {
        if (dragData.tag !== "base") {
          if (dragData.type === "move") {
            this.moveJudge(dragData.index);
          } else {
            debugger
              this.dropJudge(dragData.data, event);
          }
        }else{
          const { onDrop ,dataSet} = this.props;
           onDrop(dragData.data,dataSet)
        }
      });
    };
    render() {
      const { currentDropIndex, dataSet, gridIndex } = this.props;
      return (
        <Fragment>
          <div
            onDragStart={this.onDragStart}
            onDragEnter={event=>this.onDragEnter(event)}
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            onDrop={this.onDrop}
            ref={comp => {
              this.containerComp = comp;
            }}
            style={dataSet ? {} : { height: "100%" }}
          >
            <Component {...this.props} {...this.state}/>
            {currentDropIndex === gridIndex ? (
              <div className="wf-dragging-mark" />
            ) : (
              ""
            )}
          </div>
        </Fragment>
      );
    }
  };
}
