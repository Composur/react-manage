import React, { Component } from 'react';
import { Card ,Table,Button,Icon,message} from 'antd';
import {reqCatagoryList} from '../../api'
export default class  extends Component {
    state = { 
    loading:false,
    categoryList:[],//一级列表
    subCategoryList:[],//子分类列表
    parentId:0,//初始获取一级列表
   }
  constructor(){
    super()
    this.title=this.title()
    this.addCatagoryBtn=this.CatagoryBtn()
    this.initColumns=this.initColumns()
  }
  title(){
    return '一级分类'
  }
  initColumns(){
    return  [
      {
        title: '分类名称',
        key: '01',
        dataIndex: 'name',
      },
      {
        title: '操作',
        key: '02',
        width:300,
        render:(text, record, index)=>(
          <span>
          <Button type="link" onClick={this.updateCategory(text)}>修改分类</Button>
          <Button type="link" onClick={this.getSubCategoryList(text)}>查看子分类</Button>
          </span>
        )
      },
    ];
  }
  updateCategory=(data)=>{

  }

  CatagoryBtn(){
    return  <Button type='primary' onClick={this.addCatagory}><Icon type='plus'></Icon>添加</Button>
  }
  addCatagory=()=>{
    message.success('zheng')
  }
  getCategoryList=async ()=>{
    const {parentId} =this.state
    this.setState({loading:true})
    const params={parentId:parentId}
    const {data} = await reqCatagoryList(params)
    if(parentId===0){
      this.setState({categoryList:data,loading:false}) //一级列表
    }else{
      this.setState({subCategoryList:data,loading:false}) //子列表
    }
  }
  // 更新子列表
  getSubCategoryList(data={}){
    this.setState({parentId:data._id},()=>{ 
      this.getCategoryList()
    })
  }
  componentDidMount(){
    this.getCategoryList()
  }
  render() {
    return (
      <div>
        <Card title={this.title} extra={this.addCatagoryBtn} >
          <Table dataSource={this.state.categoryList} columns={this.columns} bordered rowkey='_id'
            loading={this.state.loading}
          />
        </Card>
      </div>
    );
  }
}