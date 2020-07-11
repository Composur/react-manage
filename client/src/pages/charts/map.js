import React, { Component } from "react";
import echarts from "echarts";
// import world from 'echarts/map/js/world.js';
// 有两种用法
import world from "echarts/map/json/world.json";
import options from "../../mock/map.json";
// import china from 'echarts/map/json/china.json';

//  echarts.registerMap('world', world);/* 注册world地图 */
//  echarts.registerMap('china', china);/* 注册world地图 */
// 或者
// import world from 'echarts/map/js/world.js';
// import china from 'echarts/map/js/china.js';
// 没什么不同的， js文件里是帮我们做了注册json
import { deepClone } from "../../utils/common";
import ReactEcharts from "echarts-for-react";
import { reqMapOptions, reqMapWorld } from "../../api";
export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      options: {},
      world: {},
    };
  }
  getRandomData(data) {
    let result = data.slice();
    return result.slice(0, Math.round(Math.random() * (data.length - 1)));
  }
  componentDidMount() {
    this.getOptions();
  }
  refreshData() {
    const { options } = this.state;
    if (!options || !options.series) {
      return;
    }

    let option = deepClone(this.rawOptions);

    let data4 = option.series[4].data;
    let data5 = option.series[5].data;
    let data6 = option.series[6].data;

    option.series[4].data = this.getRandomData(data4);
    option.series[5].data = this.getRandomData(data5);
    option.series[6].data = this.getRandomData(data6);

    this.setState({
      options: option,
    });
  }
  getOptions = async () => {
    // const option = await reqMapOptions() 
    const option = options
    // option.geo.zlevel = 1;
    // option.series.forEach((s, index) => {
    //   s.zlevel = index + 2;
    //   if (s.effect) {
    //     s.effect.zlevel = index + option.series.length + 2;
    //   }
    //   if (s.rippleEffect) {
    //     s.rippleEffect.zlevel = index + option.series.length + 2;
    //   }
    // });
    // this.rawOptions = option;
    // this.options = option;
    const world = await reqMapWorld();
    echarts.registerMap("world", world);
    // this.setState({
    //   options: option,
    //   world,
    // });
    // var chart = echarts.init(document.getElementById("map"), null, {
    //   devicePixelRatio: 1,
    // });
    
    // chart.setOption(option);
    // window.addEventListener("resize", chart.resize);
    // setInterval(() => {
    //   this.refreshData();
    // }, 5000);
  };
  getOption(){
    return options
  }
  render() {
    return (
      <>
        <ReactEcharts option={this.getOption()}/>
      </>
    );
  }
}
