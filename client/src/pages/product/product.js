import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Card,Select,Button,Table,Input,message,Typography} from 'antd';
import {reqProductList,reqSearchProduct,reqDeleteProduct,reqProductStatus} from 'api'
import {formatNumber} from '../../utils/common'
const { Option } = Select;
const { Text } = Typography;
const PAGE_SIZE = 2
const btnStyle={
  marginLeft:'0.5rem'
}
class Product extends Component {
  state = {
    pageNum:1,
    selectValue: '1',
    productListSource:[],
    total:0,
    btnLoading:false,
    tableLoading:false,
    inputPlaceholder:'请输入名称',
    inputValue:'',
    loading:false
  };
  constructor(){
    super()
    const {loading} = this.state
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(record)=>(`￥${record}`)
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      // {
      //   title: '详情',
      //   dataIndex: 'detail',
      // },
      {
        title: '状态',
        render:(record)=>(<span><Text type={record.status?'success':'danger'} >{record.status?'在售':'下架'}</Text><Button size='small' style={btnStyle} loading={loading}
          onClick={()=>this.上架_下架(record)}
          type='primary'>{record.status?'下架':'上架'}</Button></span>
          )
      },
      {
        title: '操作',
        render:(record)=>(
          <span>
          <Button type="link" onClick={()=>(
            this.productDetail(record)
          )}>详情</Button>
          <Button type="link" onClick={()=>(
            this.productUpdate(record)
          )}>修改</Button>
          <Button type="link" loading={this.state.btnLoading} onClick={()=>(
            this.productDelete(record)
            )}>删除</Button>
          </span>
        )
      },
    ];
  }
  // 上架
  //  const {productId, status} = req.body
  // 下架 用中文没毛病 维持好就行 0 下架 1上架
  上架_下架= async (product)=>{
    this.setState({loading:true})
    const params={
      productId:product._id,
    }
    if(product.status){
      params.status=0
    }else{
      params.status=1
    }
    const res= await reqProductStatus(params)
    if(res.status===0){
      this.setState({loading:false})
      message.success('更新成功！')
      this.getProductList(this.pageNum)
    }
  }
  productUpdate= async (record)=>{
    this.props.history.push('/product/add',record)
  }
  productDelete = async (record) =>{
    const res = await reqDeleteProduct({_id:record._id}) 
    if(res.status===0){
      this.getProductList(1)
    }
  }
  // 商品详情
  productDetail = (data) => {
    // 这种语法只有 BrowserRouter 才支持 HashRouter不支持请注意
    this.props.history.push({
      pathname: '/product/detail',
      state: data
    })
    // 1、HashRouter不支持请注意 可以存到redux进行处理
    // 2、存到内存中（记得在componentWillUnmount进行清除内存中的数据）
  }
  
  // 搜索筛选框
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
  // searchBtn= async (e)=>{
  //   e.stopPropagation();
  //   const {selectValue,inputValue}=this.state
  //   if( !inputValue || !inputValue.trim()){
  //     this.setState({inputValue:null})
  //     message.warning('不能为空')
  //     return
  //   }
  //   this.setState({loading:true})
  //   const params={
  //     pageNum,pageSize:PAGE_SIZE
  //   }
  //   selectValue==='1'?params.productName=inputValue:params.productDesc=inputValue
  //   const res = await reqSearchProduct(params)
  //   const {list,total}=res.data
  //   if(!list[0]){message.warn('搜索结果为空！')}
  //   this.setState({total,productListSource:list,loading:false})
  // }
  // 添加商品
  addProductBtn=(e)=>{
    e.stopPropagation()
    this.props.history.push('/product/add')
  }
  // 商品列表
  getProductList= async(pageNum)=>{
    const {inputValue} = this.state
    this.pageNum=pageNum //保存全局，状态更新的时候能够定位到当前页
    this.setState({
      tableLoading:true,
    })
    let res;
    if(inputValue){ //搜索商品列表
      this.setState({
        btnLoading:true,
      })
       res= await reqSearchProduct({pageNum,pageSize: PAGE_SIZE})
    }else{ //全部商品列表
       res= await reqProductList({pageNum,pageSize:PAGE_SIZE})
    }
    const {total,list}=res.data
    if (res.status === 0 && list.length > 0) {
      // 格式化金额
      list.forEach(item=>{
        item.price=formatNumber(item.price)
      })
      this.setState({
        total,
        productListSource:list,
        tableLoading:false,
        btnLoading:false
      })
    }
  }
  componentDidMount(){
    this.getProductList(1)
  }
  render() {
    const {tableLoading,productListSource,total,btnLoading,inputPlaceholder,inputValue}=this.state
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
      <Button type='primary' style={{transform:'scale(1)'}} onClick={()=>this.getProductList(1)} loading={btnLoading}>搜索</Button>
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
       <Table size='small' dataSource={productListSource} columns={this.columns} rowKey={'_id'} bordered 
       loading={tableLoading}
       pagination={{
        // current:currentSize,
        // defaultCurrent:1,
        // defaultPageSize:pageSize,
        // hideOnSinglePage:false,//一页隐藏分页'
        // pageSize,
        // showQuickJumper:true,
        current: this.pageNum,
        total,
        defaultPageSize: PAGE_SIZE,
        showQuickJumper: true,
        onChange:this.getProductList,
       }}
       />
      </Card>
    ); 
  }
}
export default withRouter(Product)