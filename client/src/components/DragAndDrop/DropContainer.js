import React, { PureComponent } from "react";
import WrapperDrop from "./WrapperDrop.js";

class DropContainer extends PureComponent {
  render() {
    const { children,currentDropIndex} = this.props;
    return (
      <div className="wf-formcanvas-layout-inner">
        {currentDropIndex === -1 ? <div className="wf-dragging-mark" /> : null}
        {children}
      </div>
    );
  }
}

export default WrapperDrop(DropContainer);
