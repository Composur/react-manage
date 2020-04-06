import React,{useState,useEffect,memo, useRef} from 'react'
class ExampleComponent extends React.Component {

  // 用于初始化 state
  constructor() {}
  useState()

  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  static getDerivedStateFromProps(nextProps, prevState) {}
  useState()

  static getDerivedStateFromError(){}
  // Hooks 暂未实现组件错误处理的功能

  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  memo() // memo 用于函数组件和 Hooks 关系不大

  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  useEffect(()=>{
    componentDidMount() {}
    return ()=>{
      componentWillUnmount() {}
    }
  },[])

  // 用于获得最新的 DOM 数据
  getSnapshotBeforeUpdate() {}
  useEffect() 结合 useRef() 用 useRef() 保存上传的状态

  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  useEffect()

  // 组件销毁后调用
  componentDidUnMount() {}
  
  // 组件更新后调用
  componentDidUpdate() {}
  useEffect()

  // 渲染组件函数
  render() {}
  


  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
}