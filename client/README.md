## 功能说明
### 登录
  1. 维持登陆与自动登陆
### 首页
  1. 左侧导航
    + 抽取成数据的形式`menuConfig.js`进行递归渲染
  2. 刷新自动选择当前菜单项
    + 根据当前请求的路径进行匹配defaultSelectedKeys({key})
      + bug:根路径请求后无法匹配
      + fix:改用selectedKeys({key})，动态传入
      + 获取子组件的父组件的key进行展开
    + 因为当前组件不是路由组件需要用WithRouter包一下再导出
  