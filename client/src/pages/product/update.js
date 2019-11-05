import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
class updateProduct extends Component {
  state = {  }
  render() {
    const oldData = this.props.location.state
    return (
      <div>update</div>
    ); 
  }
}

export default withRouter(updateProduct)