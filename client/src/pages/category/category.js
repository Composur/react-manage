import React, { Component } from 'react';
import { Card ,Table,Button,Icon,Modal,Breadcrumb} from 'antd';
import {reqCatagoryList,reqAddCategory,reqUpdateCategory,reqDeleteCategory} from 'api'
import AddForm from './add-form'
import UpdateForm from './update-form'
const { confirm } = Modal;
export default class  extends Component {
    state = { 
      loading:false,
      categoryList:[],//一级列表
      subCategoryList:[],//子分类列表
      parentId:'0',//初始获取一级列表
      subCategoryListNavName:'',
      showModal:0,//0:都不显示；1：显示添加一级分类；2：修改分类
      currentRowData:{}, //默认一级
      confirmLoading:false
   }
  constructor(props){
    super(props)
    this.addCatagoryBtn=this.CatagoryBtn()
    this.initColumns=this.initColumns()
  }
  initColumns(){
    return  [
      {
        title: '分类名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '操作',
        key: '02',
        width:300,
        render:(record)=>(
          <span>
          <Button type="link" onClick={()=>(
            this.updateCategory(record)
          )}>修改</Button>
          <Button type="link" onClick={()=>(
            this.deleteCategory(record)
          )}>删除</Button>
          {
            this.state.parentId==='0'? <Button type="link" onClick={()=>(
              this.getSubCategoryList(record)
             )}>查看子分类</Button>:null
          }
          </span>
        )
      },
    ];
  }
  deleteCategory= (record)=>{
    confirm({
      title: '确认删除该分类?',
      content: record.name,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async ()=> {
        const res = await reqDeleteCategory({_id:record._id})
        if(res.status===0){
          this.getCategoryList()
        }
      },
      onCancel() {
        
      },
    })
  }
  updateCategory= (data)=>{
    this.setState({
      showModal: 2,
      currentRowData:data
    });
  }
  CatagoryBtn(){
    return  <Button type='primary' onClick={this.addCatagory}><Icon type='plus'></Icon>添加</Button>
  }
  // 显示添加分类模态框
  addCatagory=()=>{
    this.setState({
      showModal: 1,
    });
  }
  // 获取列表
  getCategoryList=async ()=>{
    const {parentId} =this.state
    this.setState({loading:true})
    const params={parentId:parentId}
    const {data} = await reqCatagoryList(params)
    if(parentId==='0'){
      this.setState({categoryList:data,loading:false}) //一级列表
    }else{
      this.setState({subCategoryList:data,loading:false}) //子列表
    }
  }
  // 获取子列表
  getSubCategoryList=(data)=>{
    this.setState({
      parentId:data._id,
      subCategoryListNavName:data.name,
      currentRowData:data
    },()=>{
      this.getCategoryList()
    })
  }
  // 一级列表回显
  categoryList=()=>{
    this.setState({
      parentId:'0',
      subCategoryList:[],
      subCategoryListNavName:null,
      currentRowData:{_id:'0',name:'一级分类'}, //默认一级
    })
  }
  // 添加分类
  addCategoryModalHandleOk =  e => {
    this.form.validateFields( async (err,values)=>{
      if(!err){
        this.setState({
          confirmLoading: true,
        });
        const {categoryId,categoryName} = values
        const params = {
          categoryName,
          parentId: categoryId
        }
        const {status} = await reqAddCategory(params)
        this.form.resetFields()
        if(status===0){
          this.setState({
            showModal: 0,
            confirmLoading: false,
          });
          // 当前列表才去请求
          if(this.state.parentId===categoryId){
            this.getCategoryList()
          }else if(categoryId==='0'){  //在二级列表下添加一级列表项
            // debugger
          }
        }
      }
    })
   
  };
  // 修改分类
  updateCategoryModalHandleOk  =  e => {
   this.form.validateFields(async(err,values)=>{
     if(!err){
      this.setState({
        confirmLoading: true,
      });
      const params = {
        categoryName: values.categoryName,
        categoryId: this.state.currentRowData._id
      }
      this.form.resetFields()
      const {status} = await reqUpdateCategory(params)
      if(status===0){
        this.setState({
          showModal: 0,
          confirmLoading: false,
        });
        // 更新列表
        this.getCategoryList()
      }
     }
   })
  };
  // 关闭模态框
  modalHandleCancel = e => {
    this.setState({
      showModal: 0,
      currentRowData:{}
    });
    
    // 清除antd缓存的input数据，只要触发input就会缓存当前值,需要清除当前值
    this.form.resetFields()
    // 也可以动态改变input的值
    // this.form.setFieldsValue({
    //   categoryId: this.state.currentRowData.name,
    // });
  };
  componentDidMount(){
    this.getCategoryList()
  }
  render() {
    const {categoryList,loading,showModal,parentId,subCategoryList,subCategoryListNavName,currentRowData,confirmLoading} =this.state
    const title= (
      <Breadcrumb>
        <Breadcrumb.Item onClick={this.categoryList} style={{cursor:'pointer'}}>品类管理</Breadcrumb.Item>
        <Breadcrumb.Item >{subCategoryListNavName}</Breadcrumb.Item>
      </Breadcrumb>
    )
    return (
      <div>
        <Card title={title} extra={this.addCatagoryBtn} >
          <Table dataSource={parentId==='0'?categoryList:subCategoryList} columns={this.initColumns} bordered rowKey='_id'
            loading={loading}
            pagination ={{pageSize:5}}
          />
        </Card>
        <Modal
          title="添加分类"
          visible={showModal===1}
          onOk={this.addCategoryModalHandleOk}
          onCancel={this.modalHandleCancel}
          confirmLoading={confirmLoading}
          >
          <AddForm categoryList={categoryList} currentRowData={currentRowData} setForm={(form)=>{this.form=form}}/>
        </Modal>
        <Modal
          title="修改分类"
          visible={showModal===2}
          onOk={this.updateCategoryModalHandleOk}
          onCancel={this.modalHandleCancel}
          confirmLoading={confirmLoading}
          >
          {/* 通过函数得到子组件的form对象;子组件调用setFrom(form) */}
          <UpdateForm setForm={(form)=>{this.form=form}} currentRowData={currentRowData}/>
        </Modal>
      </div>
    );
  }
}