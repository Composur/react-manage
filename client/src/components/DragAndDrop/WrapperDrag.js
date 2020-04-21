import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import emitter from "../../directive/dragdropdirective";
const emitter$ = emitter;
export default function WrapperDrag(Component, dragTag) {
  return class DragElement extends PureComponent {
    state = {
      draggable: true,
      dragStart: false
    };
    onDragStart = () => {
      const { dataSet} = this.props;
      emitter$.setDragData({ tag: dragTag, type: "new", data: dataSet });
      this.setState({ dragStart: true });
    };
    onDragEnd = () => {
      this.setState({ dragStart: false });
    };
    render() {
      const { dragStart } = this.state;
      const { className } =  this.props
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
