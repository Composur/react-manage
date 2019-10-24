import React, { Component } from 'react';
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'
import store from '../../utils/storeUtils'
import {reqWeather,reqAddress} from '../../api'
import {getCurrentDate} from '../../utils/common'
import './index.less'

class HeaderSelf extends Component {
  state = { 
    weather:'',
    date:getCurrentDate(new Date()),
    weatherText:'',
    address:''
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
            store.remove('user_key')
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
    const {address,address_detail}= await reqAddress()
    const {city}=address_detail
    this.getWeather(city)
    this.setState({
      address
    })
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
          <a href='#' onClick={this.exitConfirm} className='header-exit-btn'>退出</a>
        </div>
        <div className='header-buttom'>
          <span className='getSource'><a rel="noopener noreferrer"  href='https://github.com/Composur/react-manage' target='_blank'>获取前端+后台源码</a></span>
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