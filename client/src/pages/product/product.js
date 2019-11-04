import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card,Select,Button,Table,Input,message} from 'antd';
import {reqProductList,reqSearchProduct} from '../../api'

const { Option } = Select;
class Product extends Component {
  state = {
    selectValue: '1',
    pageNum:0,
    pageSize:5,
    currentSize:0,
    productListSource:[],
    total:0,
    loading:false,
    inputPlaceholder:'请输入名称',
    inputValue:'',
  };
  constructor(){
    super()
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(record)=>(`￥${record}`)
      },
      {
        title: '状态',
        dataIndex: 'status',
        render:(record)=>(record===0?<Button type='link'>下架</Button>:'在售')
      },
      {
        title: '操作',
        dataIndex: 'product',
        render:(record)=>(
          <span>
          <Button type="link" onClick={()=>(
            this.productDetail(record)
          )}>详情</Button>
          <Button type="link" onClick={()=>(
            this.productUpdate(record)
          )}>修改</Button>
          <Button type="link" onClick={()=>(
            this.productDelete(record)
            )}>删除</Button>
          </span>
        )
      },
    ];
  }
  // 商品详情
  productDetail = (data) => {
    const data1 = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
      'Los Angeles battles huge wildfires.',
    ];
    this.props.history.push({
      pathname: '/product/detail',
      state: data1
    })
  }
  selectHandleChange = selectValue => {
    this.setState({ selectValue,
      inputPlaceholder:selectValue==='1'?'请输入名称':'请输入描述',
      inputValue:''
    });
  };
  inputValue=(e)=>{
    this.setState({
      inputValue:e.target.value
    })
  }
  // 搜索
  searchBtn= async (e)=>{
    e.stopPropagation();
    const {selectValue,inputValue,pageNum,pageSize}=this.state
    if( !inputValue || !inputValue.trim()){
      this.setState({inputValue:null})
      message.warning('不能为空')
      return
    }
    this.setState({loading:true})
    const params={
      pageNum,pageSize
    }
    selectValue==='1'?params.productName=inputValue:params.productDesc=inputValue
    const res = await reqSearchProduct(params)
    const {list,total}=res.data
    if(!list[0]){message.warn('搜索结果为空！')}
    this.setState({total,productListSource:list,loading:false})
  }
  // 添加商品
  addProductBtn=(e)=>{
    e.stopPropagation()
    this.props.history.push('/product/add')
  }
  // 商品列表
  getProductList= async(current,size)=>{
    this.setState({
      loading:true
    })
    let {pageNum,pageSize,inputValue}=this.state
    let res;
    if(inputValue){ //搜索商品列表
       res= await reqSearchProduct({pageNum,pageSize})
    }else{ //全部商品列表
       res= await reqProductList({pageNum,pageSize})
    }
    const {total,list}=res.data
    if (res.status === 0 && list.length > 0) {
      this.setState({
        pageNum:res.data.pageNum,
        total:total,
        productListSource:list,
        loading:false
      })
    }
  }
  componentDidMount(){
    this.getProductList()
  }
  render() {
    const {productListSource,currentSize,pageSize,total,loading,inputPlaceholder,inputValue}=this.state
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        price: 32,
        desc: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        price: 42,
        desc: '西湖区湖底公园1号',
      },
    ];
    const title=()=>{
      return (
       <div>
       <Select defaultValue="1" 
       style={{ width: '7rem' }}
       onChange={this.selectHandleChange}>
       <Option value="1">按名称搜索</Option>
       <Option value="2">按描述搜索</Option>
       </Select>
      <Input style={{width:200,marginLeft:6,marginRight:6}}  placeholder={inputPlaceholder} onChange={this.inputValue} value={inputValue} />
      <Button type='primary' style={{transform:'scale(1)'}} onClick={this.searchBtn} loading={loading}>搜索</Button>
       </div>
      )
    }
    const addComponment=()=>(
      <span>
      <Button icon="plus" type='primary' onClick={this.addProductBtn}>添加商品</Button>
      </span>
    )
   
    return (
      <Card title={title()} extra={addComponment()}>
       <Table size='small' dataSource={dataSource} columns={this.columns} rowKey={'_id'} bordered 
       pagination={{
        current:currentSize,
        defaultCurrent:1,
        defaultPageSize:pageSize,
        hideOnSinglePage:false,//一页隐藏分页'
        pageSize,
        showQuickJumper:true,
        total,
        onChange:this.getProductList,
        loading,
       }}
       />
      </Card>
    ); 
  }
}
export default withRouter(Product)