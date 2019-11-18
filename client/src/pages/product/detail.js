import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Card,List,Icon,Typography} from 'antd'
const { Text } = Typography;
const listStyle={fontSize:15,marginRight:'1rem'}
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
    const listTitle=[
      '商品名称','商品描述','商品价格','所属分类','商品图片','商品详情'
    ]
    return (
      <Card title={this.title}>
      <List
        header={<div>商品详情</div>}
        bordered
        // dataSource={data}
        // renderItem={(item,index) => (
        //   <List.Item>
        //     <Text  style={{fontSize:15,marginRight:'1rem'}}>{listTitle[index]}:</Text>{item}
        //   </List.Item>
        //   )}
        >
        <List.Item>
            <Text  style={listStyle}>{listTitle[0]}:</Text>{data.name}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[1]}:</Text>{data.desc}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[2]}:</Text>{data.price}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[3]}:</Text>{data.categoryId}-{data.pCategoryId}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[4]}:</Text>{'图片'}
        </List.Item>
        <List.Item>
            <Text  style={listStyle}>{listTitle[5]}:</Text>{data.detail}
        </List.Item>
        </List>
      </Card>
    ); 
  }
}
export default withRouter(ProductDetail)