## 功能说明
### 登录
  + 维持登陆与自动登陆
    + 首次登录时，node判断用户账号密码正确之后，根据用户id、用户名、定义好的秘钥、过期时间生成 token ，返回给前端；
    ```
    //生成token的方法
    function  generateToken(data){
      let created = Math.floor(Date.now() / 1000);
      let cert = fs.readFileSync(path.join(__dirname, '../config/rsa_private_key.pem'));//私钥
      let token = jwt.sign({
          data,
          exp: created + 3600 * 24 
          // exp: created + 10
      },cert, {algorithm: 'RS256'});
      return token;
    }

    UserModel.findOne({username, password: md5(password)},filter)
    .then(user => {
      if (user) { // 登陆成功
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        let token = generateToken({username});
        if (user.role_id) {
          RoleModel.findOne({_id: user.role_id})
            .then(role => {
              user._doc.role = role
              res.send({status: 0, data: user,token:token})
            })
        } else {
          user._doc.role = {menus: []}
          res.send({status: 0, data: user,token:token})
        }

      } else {
        res.send({status: 1, msg: '用户名或密码不正确!'})
      }
    })
    ```
    + 前端拿到后端返回的 token ,存储在 localStroage 或其它你想存的地方；
    ```
      async (err, values) => { 
        if (!err) {
          values=Object.assign(values,{username:btoa(values.username),password:btoa(values.password)})
          const res = await reqLogin(values)
          if (res.status === 0) {
            // message.success('登录成功！')
            store.set('user_key', res.data) 
            store.set('token', res.token) //全局存储 store是npm包 对标localstorage
            store.user=res.data
            this.props.history.replace('/') 
          } else {
            message.error(res.msg)
          }
        }
      });
    ```
    + 前端每次路由跳转，判断 localStroage 有无 token ，没有则跳转到登录页，有则请求获取用户信息，改变登录状态；
      + react需要自己定义貌似没有好用的beforeEnter拦截件，可以在ajax根据后端返回的HTTP状态码统一处理请求，若无权限直接去登录。
      + Vue可以这样做
    + 每次请求接口，在 Axios 请求头里携带 token;
    ```
    axios.defaults.headers.common['Authorization'] = store.get('token')
    ```
    + 后端接口判断请求头有无 token，没有或者 token 过期，返回401；
    ```
    app.use((req,res,next)=>{
      let token=req.headers.authorization
      const cookie=req.cookies
      const url=req.url
      let cert = fs.readFileSync(path.join(__dirname, './config/rsa_public_key.pem'));//公钥
      if(url.indexOf('/api/login') !== 0){
          try{
            let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            let {exp = 0} = result,current = Math.floor(Date.now()/1000);
            console.log(cookie)
            if(current <= exp){
                next()
            }
        }catch(e){
          res.send({status: 1, msg: '登录信息失效，请重新登录'})
        }
      }else{
        next()
      }
    })
    ```
    + 前端得到 401 状态码，重定向到登录页面。在axios里统一处理
    ```
    axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
            redirect()
            break;
          }
        }
        return Promise.reject(error.response)
      }
    )
    ```


### 头部
  + 欢迎项
  +  退出登录
  +  当日天气
### 左侧菜单
  #### 导航
  + 抽取成数据的形式`menuConfig.js`进行递归渲染
  + 刷新自动选择当前菜单项
    1. 根据当前请求的路径进行匹配`defaultSelectedKeys({key})`
    2. bug:根路径请求后无法匹配
    3. fix:改用`selectedKeys({key})`，动态传入
    4. 获取子组件的父组件的`key`进行展开
    5. 因为当前组件不是路由组件需要用`WithRouter`包一下再导出
  #### 商品
  + 品类管理
    + 添加
      + 抽离组件复用父组件数据
    + 修改
      + 子组件与父组件通信
    + 查看子分类
      + `setState`异步更新
      + 同步更新添加的`select`的默认选项
        + 首先本组件接收一个要添加的父级分类的id
        + 设置`form.item`的i`nitialValue`为父类传入的id可匹配`value`
      + 有条件的进行添加/更新后的操作减少`HTTP`请求

  