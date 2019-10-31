import React, { Component } from 'react';
import { Card,Select,Button,Table,Input} from 'antd';
import {reqProductList,reqSearchProduct} from '../../api'

const { Option } = Select;

export default class  extends Component {
  state = {
    data: [],
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
            this.updateCategory(record)
          )}>详情</Button>
          <Button type="link" onClick={()=>(
            this.deleteCategory(record)
          )}>修改</Button>
          <Button type="link" onClick={()=>(
            this.getSubCategoryList(record)
            )}>删除</Button>
          </span>
        )
      },
    ];
  }
  // handleSearch = value => {
  //   if (value) {
  //     // 异步请求
  //     fetch(value, data => this.setState({ data }));
  //   } else {
  //     this.setState({ data: [] });
  //   }
  // };
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
    const {selectValue,inputValue}=this.state
    const params={}
    selectValue==='1'?params.productName=inputValue:params.productDesc=inputValue
    const {data} = await reqSearchProduct(params)
  }
  // 添加商品
  addProductBtn=(e)=>{
    e.stopPropagation()
  }
  getProductList= async(current,size)=>{
    this.setState({
      loading:true
    })
    let {pageNum,pageSize}=this.state
    const res= await reqProductList({pageNum,pageSize})
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
    // const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const title=()=>{
      return (
       <div>
       <Select defaultValue="1" 
       dropdownMatchSelectWidth={false}
       onChange={this.selectHandleChange}>
       <Option value="1">按名称搜索</Option>
       <Option value="2">按描述</Option>
       </Select>
      {
      // 也可以用搜索
      //   <Select
      //   showSearch
      //   value={this.state.value}
      //   placeholder={'请输入关键字'}
      //   style={{width:200,marginLeft:8,marginRight:6}}
      //   defaultActiveFirstOption={false}
      //   showArrow={false}
      //   filterOption={false}
      //   onSearch={this.handleSearch}
      //   onChange={this.handleChange}
      //   notFoundContent={null}
      // >
      // {options}
      // </Select>
      }
      <Input style={{width:200,marginLeft:6,marginRight:6}}  placeholder={inputPlaceholder} onChange={this.inputValue} value={inputValue} />
      <Button type='primary' onClick={this.searchBtn}>搜索</Button>
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