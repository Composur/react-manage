import React, { PureComponent } from "react";
// import Resize from '../../components/ResizeDemo'
const style = {
  position: "absolute",
  width: "100px",
  height: "100px",
  background: "red",
  cursor: "pointer",
  zIndex:1
};

export default class NativeDrag extends PureComponent {
  constructor() {
    super()
    this.state={
      isDrag : false,
      initialX : null,
      initialY : null,
    }
  }
  componentDidMount(){
   
  }
  mouseDown(e) {
    this.setState({
      isDrag : true
    })
    const { left, top } = this.el.getBoundingClientRect();
    this.setState({
      initialX:e.clientX - left,
      initialY:e.clientY - top,
    })
  }
  mouseMove(e) {
    const {isDrag} = this.state
    if (isDrag) {
      const {initialX,initialY} = this.state
      this.el.style.left = `${e.clientX - initialX}px`;
      this.el.style.top = `${e.clientY - initialY}px`;
    }
  }
  mouseUp() {
    this.setState({
      isDrag:false
    })
  }
  render() {
    return (
      <>
        <div
          style={style}
          ref={(el) => (this.el = el)}
          onMouseDown={e=>this.mouseDown(e)}
          onMouseMove={e=>this.mouseMove(e)}
          onMouseUp={e=>this.mouseUp(e)}
        >
          原生拖拽
        </div>
      </>
    );
  }
}

