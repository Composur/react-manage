/*
应用的启动模块
1. 通过express启动服务器
2. 通过mongoose连接数据库
  说明: 只有当连接上数据库后才去启动服务器
3. 使用中间件
 */
const express = require('express')
const cors = require('cors')
const app = express() // 产生应用对象
const server_port=require('./config/config.default').server_port
const connectMongo=require('./db/connect')
const fs = require('fs')
const path=require('path')
const jwt=require('jsonwebtoken')
const morgan=require('morgan')

// 日志中间件
// 自定义token
// 自定义format
// 使用自定义的format
// morgan.format('logs', '[logs] :method :url :status :res[content-length] - :response-time ms');
// const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});
// app.use(morgan('short', {stream: accessLogStream}));

// 跨域
// app.use(cors())
// 声明使用静态中间件
app.use(express.static('public'))
// 声明使用解析post请求的中间件
app.use(express.urlencoded({extended: true})) // 请求体参数是: name=tom&pwd=123
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123}
// 声明使用解析cookie数据的中间件
const cookieParser = require('cookie-parser')
app.use(cookieParser())
// 声明使用路由器中间件
const indexRouter = require('./routers')
app.use('/', indexRouter)  //


// 这种情况适合前后端不分离，前端静态页面嵌入到后端应用中
// 必须在路由器中间之后声明使用；这里是为了前端访问不到对应的路由，返回index页面
       
/*app.use((req, res) => {
  fs.readFile(__dirname + '/public/index.html', (err, data)=>{
    if(err){
      console.log(err)
      res.send('后台错误')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      });
      res.end(data)
    }
  })
})*/

function verifyToken(token){
  let cert = fs.readFileSync(path.join(__dirname, './config/rsa_public_key.pem'));//公钥
  try{
      let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
      let {exp = 0} = result,current = Math.floor(Date.now()/1000);
      if(current <= exp){
          res = result.data || {};
      }
  }catch(e){
  
  }
  return res;
  
}

// app.use(async(ctx, next) => {
//   let {url = ''} = ctx;
//   if(url.indexOf('/user/') > -1){//需要校验登录态
//       let header = ctx.request.header;
//       let {loginedtoken} = header;
//       if (loginedtoken) {
//           let result = verifyToken(loginedtoken);
//           let {uid} = result;
//           if(uid){
//               ctx.state = {uid};
//               await next();
//           }else{
//               return ctx.body = Tips[1005];
//           }
//       } else {
//           return ctx.body = Tips[1005];
//       }
//   }else{
//       await next();
//   }
// });


app.use((req,res,next)=>{
  let token=req.headers.authorization
  const cookie=req.cookies
  const url=req.url
  let cert = fs.readFileSync(path.join(__dirname, './config/rsa_public_key.pem'));//公钥
  
  if(url.indexOf('/api/login') !== 0){
      try{
        let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
        let {exp = 0} = result,current = Math.floor(Date.now()/1000);
        if(current <= exp){
            next()
        }
    }catch(e){
      res.status(401)
      res.send({status: 1, msg: '登录信息失效，请重新登录'})
    }
        
  }else{
    next()
  }
})


/*
 * 根据不同的功能划分模块(路由分块)
 *
 * */
app.use('/api', require('./routers'));








// 优化数据库连接
const startServer=function(){
  app.listen(server_port, () => {
    console.log('服务器启动成功, 监听端口:'+server_port)
  })
}
// 连接成功后启动server
connectMongo(startServer)
