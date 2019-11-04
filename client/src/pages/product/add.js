import React, { Component } from 'react';
import {Card,Icon,Form,Input,Cascader,Button} from 'antd'
import {withRouter} from 'react-router-dom'
import {reqCatagoryList} from '../../api'
const { TextArea } = Input;
function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}
class ProductAdd extends Component {
  state = { 
    productClassList:[]
   }
  constructor(){
    super()
    this.title=(
      <Icon type="arrow-left" onClick={()=>{this.props.history.goBack()}} style={{fontSize:20}}/>
    )
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
      }
    });
  };
  // 获得分类列表
  getProductClass= async (parentId)=>{
    const {data} = await reqCatagoryList({parentId})
    if(parentId==='0'){ //一级列表
      this.initSelectOptions(data)
      return
    }
    return data
  }
  productLoadData= async (selectedOptions)=>{
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    const parentId=targetOption.value
    const data = await this.getProductClass(parentId)
    targetOption.loading = false;
    if (data && data.length > 0) {
      const optionsChildren = data.map(element => {
        return {
          value: element._id,
          label: element.name,
          isLeaf: true //二级么有下级 这里设计有缺陷
        }
      })
      targetOption.children=optionsChildren
    } else {
      targetOption.isLeaf = true
    }
    this.setState({
      productClassList: [...this.state.productClassList]
    })
  }
  initSelectOptions(data){
    const productClassList= data.map(element => {
      return {
        value:element._id,
        label:element.name,
        isLeaf:false
      }
    });

    this.setState({
      productClassList,
    })
  }
  // 自定义校验价格
  priceValidator=(rule, value, callback)=>{
    if (value * 1 > 0) {
      return callback()
    }
    callback('需大于0！')
  }
  componentDidMount(){
    this.getProductClass('0')
  }
  render() {
    const {productClassList} = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Card title={this.title} extra={<a href="#">More</a>}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}  style={{width:400}}>
        <Form.Item label="商品名称">
          {getFieldDecorator('prdName', {
            rules: [{ required: true, message: '请输入名称!' }],
          })(
            <Input
              placeholder="商品名称"
            />,
          )}
        </Form.Item>
        <Form.Item label='商品描述'>
          {getFieldDecorator('prdDesc', {
            rules: [{ required: true, message: '请输入描述!' }],
          })(
            <TextArea
              placeholder="商品描述"
              autosize
            />,
          )}
        </Form.Item>
        <Form.Item label='商品价格'>
          {getFieldDecorator('prdPrice', {
            rules:[{required: true, message:'请输入价格！'},
                    {validator:this.priceValidator}
                  ]
          })(
            <Input
              prefix='￥'
              placeholder="商品价格"
              suffix="元"
            />,
          )}
        </Form.Item>
        <Form.Item label="商品分类">
          {getFieldDecorator('prdCategory', {
            // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: '请输入选择分类!' },
            ],
          })(<Cascader placeholder='请选择商品分类' options={productClassList} loadData={this.productLoadData} />)}
        </Form.Item>
        <Form.Item 
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 6 },
          }}
        >
          <Button type="primary" htmlType="submit">
            增加
          </Button>
        </Form.Item>
       </Form>
      </Card>
    ); 
  }
}
export default Form.create({ name: 'normal_login' })(withRouter(ProductAdd));