import React, { Component } from 'react';
import { Card,Select,Button} from 'antd';
const { Option } = Select;



export default class  extends Component {
  state = {
    data: [],
    value: undefined,
  };

  handleSearch = value => {
    if (value) {
      // 异步请求
      fetch(value, data => this.setState({ data }));
    } else {
      this.setState({ data: [] });
    }
  };
  handleChange = value => {
    this.setState({ value });
  };
  searchBtn=(e)=>{
    e.stopPropagation();
    
  }
  addProductBtn=(e)=>{
    e.stopPropagation()
  }
  render() {
    const options = this.state.data.map(d => <Option key={d.value}>{d.text}</Option>);
    const title=()=>{
      return (
       <div>
       <Select defaultValue="jack" 
       dropdownMatchSelectWidth={false}
       onChange={this.handleChange}>
       <Option value="jack">按名称搜索</Option>
       <Option value="lucy">按描述</Option>
       </Select>
       <Select
         showSearch
         value={this.state.value}
         placeholder={'请输入关键字'}
         style={{width:200,marginLeft:8,marginRight:6}}
         defaultActiveFirstOption={false}
         showArrow={false}
         filterOption={false}
         onSearch={this.handleSearch}
         onChange={this.handleChange}
         notFoundContent={null}
       >
       {options}
       </Select>
     <Button type='primary'  onClick={this.searchBtn}>搜索</Button>
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
       
      </Card>
    ); 
  }
}