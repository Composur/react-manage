import React, { Component } from 'react';
import LinkA from '../../components/link-a'
export default class extends Component {
  state = { 
    params:{
      href:'http://beian.miit.gov.cn/',
      target:'_black',
      text:'粤ICP备19121998号'
    }
   }
  render() {
    return (
      <div>
        Made with ❤ by XT  <LinkA params={this.state.params}/>
      </div>
    );
  }
}