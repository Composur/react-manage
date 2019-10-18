import React, { Component } from 'react';
import store from '../../utils/storeUtils'
import {reqWeather} from '../../api'
import {getCurrentDate} from '../../utils/common'
import './index.less'

export default class  extends Component {
  state = { 
    weather:'',
    date:getCurrentDate(new Date()),
    weatherText:''
   }
  exitConfirm=(e)=>{
    e.preventDefault();
    alert('exit')
  }
  async getWeather(city){
    const {date,dayPictureUrl,weather} = await reqWeather(city)
    this.setState({
      weather:date,
      imgSrc:dayPictureUrl,
      weatherText:weather
    })
  }
  componentDidMount(){
    const city='北京' 
    this.getWeather((city))
    this.timerID = setInterval(()=>{
      this.clock()
    },1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
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
          <span>{this.state.weather}</span>
          <span>{this.state.date}</span>
          <span>{this.state.weatherText}</span>
          <span className='header-buttom-weather-img'><img src={this.state.imgSrc}></img></span>
        </div>
      </div>
    );
  }
}