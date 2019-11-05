import React, { Component } from 'react';
import {Modal, Button} from 'antd'
import {withRouter} from 'react-router-dom'
import store from '../../utils/storeUtils'
import {reqWeather,reqAddress} from '../../api'
import {getCurrentDate} from '../../utils/common'
import LinkA from '../../components/link-a'
import './index.less'

class HeaderSelf extends Component {
  state = { 
    weather:'',
    date:getCurrentDate(new Date()),
    weatherText:'',
    address:''
   }
   params={
    href:'https://github.com/Composur/react-manage',
    target:'_black',
    text:'获取（前端+后台）源码'
  }
  exitAhref={
    href:'#',
    text:'退出'
  }
  exitConfirm=(e)=>{
    e.preventDefault();
    Modal.confirm({
      title:'退出',
      content: '确定退出？',
      okText:'退出',
      cancelText:'取消',
      confirmLoading:true,
      onOk:()=> {
        return new Promise((resolve, reject) => {
          this.exitTimerID=setTimeout(()=>{
            store.clearAll()
            // store.remove('user_key')
            store.user=null
            resolve(null)
            this.props.history.replace('/')
          },500);
        }).catch(() => console.log('Oops errors!'));
      },
    })
  }
  async getWeather(city){
    const {date,dayPictureUrl,weather} = await reqWeather(city)
    this.setState({
      weather:date,
      imgSrc:dayPictureUrl,
      weatherText:weather
    })
  }
  async getAddress(){
    try {
      const {address,address_detail}= await reqAddress()
      // 坐标取值不准确
      // let {x,y}=point
      // x=(x/100000).toFixed(4)-13
      // y=(y/100000).toFixed(4)-13
      let {city}=address_detail
      if(!city){city='深圳'}
      this.getWeather(city)
      this.setState({
        address
      })
    } catch (error) {
      this.getWeather()
    }
  }
  componentDidMount(){
    this.getAddress()
    this.timerID = setInterval(()=>{
      this.clock()
    },1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.exitTimerID);
  }
  clock(){
    this.setState({
      date:getCurrentDate(new Date())
    })
  }
  render() {
    const username=store.user.username
    
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎您，{username}</span>
          <Button type='link' onClick={this.exitConfirm}>退出</Button>
        </div>
        <div className='header-buttom'>
          <span className='getSource'>
          <LinkA params={this.params}/>
          </span>
          <span>{this.state.address}</span>
          <span>{this.state.weather}</span>
          <span>{this.state.date}</span>
          <span>{this.state.weatherText}</span>
          <span className='header-buttom-weather-img'><img src={this.state.imgSrc} alt=''></img></span>
        </div>
      </div>
    );
  }
}
export default withRouter(HeaderSelf)