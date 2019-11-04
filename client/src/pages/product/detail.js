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
    const data=this.props.location.state //路由传进来的数据
    const {} = data
    const listTitle=[
      '商品名称','商品描述','商品价格','所属分类','商品图片','商品详情'
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
            <Text  style={{fontSize:15,marginRight:'1rem'}}>{listTitle[index]}:</Text>{item}
          </List.Item>
          )}
        />
      </Card>
    ); 
  }
}
export default withRouter(ProductDetail)