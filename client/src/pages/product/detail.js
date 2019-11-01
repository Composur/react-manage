import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Card,List,Icon,Typography} from 'antd'
const { Text } = Typography;
class ProductDetail extends Component {
  state = {  }
  constructor(){
    super()
    this.title=(
      <Icon type="arrow-left" onClick={this.goBack} style={{fontSize:20}}/>
    )
  }
  goBack=(e)=>{
    this.props.history.goBack()
  }
  render() {
    const data=this.props.location.state
    const listTitle=[
      1,2,3,4,5,6
    ]
    return (
      <Card title={this.title} extra={<a href="#"></a>}>
      <List
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item,index) => (
          <List.Item>
            <Text strong style={{fontSize:18}}>{listTitle[index]}:</Text>{item}
          </List.Item>
          )}
        />
      </Card>
    ); 
  }
}
export default withRouter(ProductDetail)