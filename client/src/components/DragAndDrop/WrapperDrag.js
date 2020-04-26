import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import emitter from "../../directive/dragdropdirective";
const emitter$ = emitter;
// 拖动元素的高阶组件
export default function WrapperDrag(Component, dragTag) {
  return class DragElement extends PureComponent {
    state = {
      draggable: true,
      dragStart: false
    };
    // 开始拖动
    onDragStart = () => {
      const { dataSet} = this.props;
      // 设置拖动的数据
      emitter$.setDragData({ tag: dragTag, type: "new", data: dataSet });
      this.setState({ dragStart: true });
    };
    // 结束拖动
    onDragEnd = () => {
      this.setState({ dragStart: false });
    };
    render() {
      const { dragStart } = this.state;
      const { className } =  this.props
      // 三个原生拖动事件 drag dragstart dragend
      return (
        <div
          className={ `clearfix margin-bottom-rem ${className?'no-margin-bottom':''}` }
          onDragStart={this.onDragStart}
          onDragEnd={this.onDragEnd}
          ref={comp => {
            this.dragComp = comp;
          }}
        >
          <Component
            {...this.props}
            dragStart={dragStart}
            // 在浏览器中，文本，图片，链接，默认是可以被拖动的
            // 其它类型需要加上  draggable=true
            draggable={true}
          />
        </div>
      );
    }
  };
}
WrapperDrag.propTypes = {
  dataSet: PropTypes.object
};
