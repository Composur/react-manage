(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{138:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o}));var a=n(44),r=n.n(a);r.a.locale("zh-cn");var c=function(e){return r()(e).format("HH:mm:ss a")},o=function(e){for(var t=(e+="").split("."),n="-"===t[0].charAt(0)?"-":"",a=n?t[0].slice(1):t[0],r="";a.length>3;)r=",".concat(a.slice(-3)).concat(r),a=a.slice(0,a.length-3);return a&&(r=a+r),"".concat(n).concat(r).concat(t[1]?".".concat(t[1]):"")}},139:function(e,t,n){"use strict";t.a=[{title:"\u9996\u9875",key:"/home",icon:"home",isPublic:!0},{title:"\u5546\u54c1",key:"/products",icon:"appstore",children:[{title:"\u54c1\u7c7b\u7ba1\u7406",key:"/category",icon:"bars"},{title:"\u5546\u54c1\u7ba1\u7406",key:"/product",icon:"tool"}]},{title:"\u7528\u6237\u7ba1\u7406",key:"/user",icon:"user"},{title:"\u89d2\u8272\u7ba1\u7406",key:"/role",icon:"safety"},{title:"\u56fe\u5f62\u56fe\u8868",key:"/charts",icon:"area-chart",children:[{title:"\u67f1\u5f62\u56fe",key:"/charts/bar",icon:"bar-chart"},{title:"\u6298\u7ebf\u56fe",key:"/charts/line",icon:"line-chart"},{title:"\u997c\u56fe",key:"/charts/pie",icon:"pie-chart"}]},{title:"\u8ba2\u5355\u7ba1\u7406",key:"/order",icon:"windows"},{title:"GitHub",key:"/github",icon:"github"}]},154:function(e,t){e.exports={serverAddress:"http://localhost:8081",baseURl:"/api",imgUrl:"http://localhost:8081/upload/"}},223:function(e,t,n){e.exports=n(407)},310:function(e,t,n){},393:function(e,t,n){},398:function(e,t,n){},407:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),o=n.n(c),l=(n(228),n(5)),i=n(20),u=n(21),s=n(23),m=n(22),p=n(24),f=n(46),d=n(56),h=n(42),b=(n(87),n(33)),g=(n(200),n(66)),v=(n(199),n(113)),y=(n(146),n(6)),E=n(34),O=n.n(E),k=n(58),j=(n(111),n(41)),P=n(76),w=n(47),T=n(72),x=(n(310),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={params:{href:"http://beian.miit.gov.cn/",target:"_black",text:"\u7ca4ICP\u590719121998\u53f7"}},n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFields(function(){var e=Object(k.a)(O.a.mark((function e(t,a){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t||(a=Object.assign(a,{username:btoa(a.username),password:btoa(a.password)}),n.props.getLoginUserInfo(a));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())},n.validatorPwd=function(e,t,n){t?(t.length<4||t.length>12)&&n("\u5bc6\u7801\u957f\u5ea6\u5e94\u5927\u4e8e4\u5c0f\u4e8e12\u4f4d\uff01"):n("\u8bf7\u8f93\u5165\u5bc6\u7801\uff01"),n()},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){if(this.props.userInfo._id)return r.a.createElement(d.a,{to:"/home"});var e=this.props.form.getFieldDecorator;return r.a.createElement("div",{className:"login"},r.a.createElement("div",{className:"header"}),r.a.createElement("div",{className:"content"},r.a.createElement("section",{className:"login-form"},r.a.createElement("div",{className:"login-label"}," ",r.a.createElement("span",null,"\u7ba1\u7406\u5e73\u53f0")),r.a.createElement(g.a,{onSubmit:this.handleSubmit,className:""},r.a.createElement(g.a.Item,null,e("username",{rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff01",min:4},{message:"\u7528\u6237\u540d\u957f\u5ea6\u5e94\u5927\u4e8e4\u5c0f\u4e8e12\u4f4d\uff01",min:4,max:12},{message:"\u7528\u6237\u540d\u53ea\u80fd\u542b\u6709\u6570\u5b57\u3001\u82f1\u6587\u3001\u4e0b\u5212\u7ebf!",pattern:/^[a-zA-Z0-9_]+$/}],initialValue:"admin"})(r.a.createElement(v.a,{prefix:r.a.createElement(y.a,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:"\u7528\u6237\u540d"}))),r.a.createElement(g.a.Item,null,e("password",{rules:[{validator:this.validatorPwd}],initialValue:"admin"})(r.a.createElement(v.a,{prefix:r.a.createElement(y.a,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:"\u5bc6\u7801"}))),r.a.createElement(g.a.Item,null,r.a.createElement(b.a,{type:"primary",htmlType:"submit",className:"login-btn",onClick:this.onSubmit},"\u767b\u5f55"))))),r.a.createElement("div",{className:"footer"},r.a.createElement("div",{className:"content"},"Made with \u2764 by XT\xa0",r.a.createElement(T.a,{params:this.state.params}))))}}]),t}(a.Component)),I=g.a.create({name:"normal_login"})(x),S={getLoginUserInfo:function(e){return function(){var t=Object(k.a)(O.a.mark((function t(n,a){var r;return O.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(P.l)(e);case 2:0===(r=t.sent).status&&(j.a.success("\u767b\u5f55\u6210\u529f\uff01"),n({type:"login_user_info",data:r.data}),w.a.set("user_key",r.data),w.a.set("token",r.token));case 4:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()}},_=Object(h.b)((function(e){return{userInfo:e.loginUserInfo}}),S)(I),C=(n(388),n(195)),N=(n(390),n(75)),A=n(191),z=n.n(A),U=(n(203),n(147)),D=n(138),G=(n(393),function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={weather:"",date:Object(D.b)(new Date),weatherText:"",address:""},n.params={href:"https://github.com/Composur/react-manage",target:"_black",text:"\u83b7\u53d6\uff08\u524d\u7aef+\u540e\u53f0\uff09\u6e90\u7801"},n.exitAhref={href:"#",text:"\u9000\u51fa"},n.exitConfirm=function(e){e.preventDefault(),U.a.confirm({title:"\u9000\u51fa",content:"\u786e\u5b9a\u9000\u51fa\uff1f",okText:"\u9000\u51fa",cancelText:"\u53d6\u6d88",confirmLoading:!0,onOk:function(){return new Promise((function(e,t){n.exitTimerID=setTimeout((function(){w.a.clearAll(),w.a.user=null,e(null),n.props.logout(),n.props.history.replace("/")}),500)})).catch((function(){return console.log("Oops errors!")}))}})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getWeather",value:function(){var e=Object(k.a)(O.a.mark((function e(t){var n,a,r,c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(P.v)(t);case 2:n=e.sent,a=n.date,r=n.dayPictureUrl,c=n.weather,this.setState({weather:a,imgSrc:r,weatherText:c});case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getAddress",value:function(){var e=Object(k.a)(O.a.mark((function e(){var t,n,a,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(P.e)();case 3:t=e.sent,n=t.address,a=t.address_detail,(r=a.city)||(r="\u6df1\u5733"),this.getWeather(r),this.setState({address:n}),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),this.getWeather();case 15:case"end":return e.stop()}}),e,this,[[0,12]])})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=this;this.getAddress(),this.timerID=setInterval((function(){e.clock()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID),clearInterval(this.exitTimerID)}},{key:"clock",value:function(){this.setState({date:Object(D.b)(new Date)})}},{key:"render",value:function(){var e=this.props.userInfo;return r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"header-top"},r.a.createElement("span",null,"\u6b22\u8fce\u60a8\uff0c",e.username),r.a.createElement(b.a,{type:"link",onClick:this.exitConfirm},"\u9000\u51fa")),r.a.createElement("div",{className:"header-buttom"},r.a.createElement("span",{className:"getSource"},r.a.createElement(T.a,{params:this.params})),r.a.createElement("span",null,this.state.address),r.a.createElement("span",null,this.state.weather),r.a.createElement("span",null,this.state.date),r.a.createElement("span",null,this.state.weatherText),r.a.createElement("span",{className:"header-buttom-weather-img"},r.a.createElement("img",{src:this.state.imgSrc,alt:""}))))}}]),t}(a.Component)),H=Object(h.b)((function(e){return{headTitle:e.getHeadTitle,userInfo:e.loginUserInfo}}),(function(e){return{logout:function(){e({type:"log_out"})}}}))(Object(d.g)(G)),R=(n(220),n(83)),q=n(139),F=(n(398),R.a.SubMenu),M=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(m.a)(t).call(this,e))).hasAuth=function(e){var t=n.props.userInfo,a=t.username,r=t.role,c=e.key,o=e.isPublic,l=e.children;return!("admin"!==a&&!o&&-1===r.menus.indexOf(c))||!!l&&!!l.find((function(e){return-1!==r.menus.indexOf(e.key)}))},n.menuNav_map=function(e){return e.map((function(e){return e.children?r.a.createElement(F,{key:e.key,title:r.a.createElement("span",null,r.a.createElement(y.a,{type:e.icon}),r.a.createElement("span",null,e.title))},n.menuNav_map(e.children)):r.a.createElement(R.a.Item,{key:e.key},r.a.createElement(f.b,{to:e.key},r.a.createElement(y.a,{type:e.icon}),r.a.createElement("span",null,e.title)))}))},n.menuNav_reduce=function(e){var t=n.props.setHeadTitle;return e.reduce((function(e,a){return n.hasAuth(a)&&(a.children?e.push(r.a.createElement(F,{key:a.key,title:r.a.createElement("span",null,r.a.createElement(y.a,{type:a.icon}),r.a.createElement("span",null,a.title))},n.menuNav_reduce(a.children))):e.push(r.a.createElement(R.a.Item,{key:a.key},r.a.createElement(f.b,{to:a.key,onClick:function(){return t(a.title)}},r.a.createElement(y.a,{type:a.icon}),r.a.createElement("span",null,a.title))))),e}),[])},n.state={collapsed:!1},n.getCurrentReqParentPath(q.a,n.props.location.pathname),n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"getCurrentReqParentPath",value:function(e,t){var n=this;e.forEach((function(e){e.children&&e.children.forEach((function(a){t.includes(a.key)&&(n.getCurrentReqParentPath=e.key)}))}))}},{key:"render",value:function(){var e=this.props.location.pathname;e.includes("/product")&&(e="/product");var t=this.getCurrentReqParentPath;return r.a.createElement("div",null,r.a.createElement("div",{className:"left-nav"},r.a.createElement(f.b,{to:"/"},r.a.createElement("div",{className:"left-nav-header"},r.a.createElement("h1",{className:"left-nav-header-content"},this.props.collapsed?null:"\u7ba1\u7406\u7cfb\u7edf"))),r.a.createElement(R.a,{mode:"inline",theme:"dark",selectedKeys:[e],defaultOpenKeys:[t]},this.menuNav_reduce(q.a))))}}]),t}(a.Component),W=Object(h.b)((function(e){return{userInfo:e.loginUserInfo}}),(function(e){return{setHeadTitle:function(t){e(function(e){return{type:"set_head_title",data:e}}(t))}}}))(Object(d.g)(M)),K=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={params:{href:"http://beian.miit.gov.cn/",target:"_black",text:"\u7ca4ICP\u590719121998\u53f7"}},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"Made with \u2764 by XT  ",r.a.createElement(T.a,{params:this.state.params}))}}]),t}(a.Component),V=(n(211),n(152)),L=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{textAlign:"center",marginTop:"10%"}},r.a.createElement(V.a,{tip:"\u52aa\u529b\u52a0\u8f7d\u4e2d...",size:"large"}))}}]),t}(a.Component),B=z()({loader:function(){return Promise.all([n.e(0),n.e(8),n.e(14)]).then(n.bind(null,1371))},loading:L}),J=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(13)]).then(n.bind(null,1368))})),X=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(11),n.e(21)]).then(n.bind(null,1372))})),Z=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(12)]).then(n.bind(null,1370))})),$=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(7),n.e(20)]).then(n.bind(null,1369))})),Q=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(3),n.e(16)]).then(n.bind(null,1363))})),Y=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(3),n.e(17)]).then(n.bind(null,1364))})),ee=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(3),n.e(15)]).then(n.bind(null,1365))})),te=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(18)]).then(n.bind(null,1366))})),ne=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(1),n.e(9),n.e(19)]).then(n.bind(null,1373))})),ae=Object(a.lazy)((function(){return n.e(10).then(n.bind(null,1367))})),re=N.a.Footer,ce=N.a.Sider,oe=N.a.Content,le=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={collapsed:!1},n.onCollapse=function(e){n.setState({collapsed:e})},n}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return this.props.userInfo._id?r.a.createElement(N.a,{style:{minHeight:"100%"}},r.a.createElement(ce,{style:{zIndex:2},collapsible:!0,collapsed:this.state.collapsed,onCollapse:this.onCollapse},r.a.createElement(W,{collapsed:this.state.collapsed})),r.a.createElement(N.a,null,r.a.createElement(H,null),r.a.createElement(oe,{style:{margin:"100px 14px 14px",background:"#fff"}},r.a.createElement(a.Suspense,{fallback:r.a.createElement(L,null)},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/",component:B}),r.a.createElement(d.b,{path:"/home",component:B}),r.a.createElement(d.b,{path:"/category",component:J}),r.a.createElement(d.b,{path:"/product",component:$}),r.a.createElement(d.b,{path:"/role",component:X}),r.a.createElement(d.b,{path:"/user",component:Z}),r.a.createElement(d.b,{path:"/charts/bar",component:ee}),r.a.createElement(d.b,{path:"/charts/line",component:Q}),r.a.createElement(d.b,{path:"/charts/pie",component:Y}),r.a.createElement(d.b,{path:"/order",component:ne}),r.a.createElement(d.b,{path:"/GitHub",component:te}),r.a.createElement(d.b,{component:ae})))),r.a.createElement(re,{style:{textAlign:"center",background:"#fff"}},r.a.createElement(K,null))),r.a.createElement(C.a,{visibilityHeight:100})):r.a.createElement(d.a,{to:"/login"})}}]),t}(a.Component),ie=Object(h.b)((function(e){return{userInfo:e.loginUserInfo}}),null)(le),ue=n(53),se=n(193),me=(n(405),n(49)),pe=n.n(me).a.get("user_key")||{},fe=Object(ue.combineReducers)({getHeadTitle:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"\u9996\u9875",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"set_head_title":return t.data;default:return e}},loginUserInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"login_user_info":return t.data;case"log_out":return{};default:return e}}}),de=Object(ue.createStore)(fe,Object(ue.applyMiddleware)(se.a)),he=n(194),be=n(44),ge=n.n(be);n(406);ge.a.locale("zh-cn");var ve=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=w.a.get("user_key");return w.a.user=e,r.a.createElement(h.a,{store:de},r.a.createElement(l.c,{locale:he.a},r.a.createElement(f.a,null,r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/login",component:_}),r.a.createElement(d.b,{path:"/",component:ie})))))}}]),t}(a.Component);o.a.render(r.a.createElement(ve,null),document.getElementById("root"))},47:function(e,t,n){"use strict";var a=n(49),r=n.n(a);t.a={user:null,set:function(e,t){r.a.set(e,t)},get:function(e){return r.a.get(e)},remove:function(e){r.a.remove(e)},clearAll:function(){r.a.clearAll()}}},72:function(e,t,n){"use strict";var a=n(0),r=n.n(a);t.a=function(e){var t=e.params||{},n=t.href,a=t.text,c=t.target;return r.a.createElement("a",{href:n,target:c},a)}},76:function(e,t,n){"use strict";n(111);var a=n(41),r=n(49),c=n.n(r),o=n(154),l=n.n(o),i=n(74),u=n.n(i);u.a.interceptors.request.use(),u.a.interceptors.response.use((function(e){return e}),(function(e){if(e.response)switch(e.response.status){case 401:break;default:return}return Promise.reject(e.response)}));var s=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u.a.defaults.headers.common.Authorization=c.a.get("token"),e=l.a.baseURl+e,new Promise((function(c,o){if("GET"===n){var l="";Object.keys(r).forEach((function(e){l+="".concat(e,"=").concat(r[e],"&")})),l&&(l=l.substring(0,l.length-1)),t=u.a.get(e+"?"+l+"&t="+new Date)}else t=u.a.post(e,r);t.then((function(e){e.data&&0===e.data.status?c(e.data):(a.a.error(e.data.msg),c(e.data))})).catch((function(e){var t=e.data;t&&t.msg?a.a.error("\u8bf7\u6c42\u51fa\u9519"+t.msg):a.a.error("\u8bf7\u6c42\u51fa\u9519"+e.message)}))}))},m=n(142),p=n.n(m);n.d(t,"l",(function(){return f})),n.d(t,"d",(function(){return d})),n.d(t,"k",(function(){return h})),n.d(t,"t",(function(){return b})),n.d(t,"u",(function(){return g})),n.d(t,"v",(function(){return v})),n.d(t,"e",(function(){return y})),n.d(t,"f",(function(){return E})),n.d(t,"a",(function(){return O})),n.d(t,"h",(function(){return k})),n.d(t,"s",(function(){return j})),n.d(t,"b",(function(){return P})),n.d(t,"g",(function(){return w})),n.d(t,"n",(function(){return T})),n.d(t,"o",(function(){return x})),n.d(t,"i",(function(){return I})),n.d(t,"m",(function(){return S})),n.d(t,"q",(function(){return _})),n.d(t,"c",(function(){return C})),n.d(t,"j",(function(){return N})),n.d(t,"p",(function(){return A})),n.d(t,"r",(function(){return z}));var f=function(e){return s("/login","POST",e)},d=function(e){return s("/manage/user/add","POST",e)},h=function(e){return s("/manage/user/delete","POST",e)},b=function(e){return s("/manage/user/update","POST",e)},g=function(e){return s("/manage/user/list","GET",e)},v=function(e){return new Promise((function(t,n){!function(e){var n="https://api.map.baidu.com/telematics/v3/weather?location=".concat(e,"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2");p()(n,{},(function(e,n){n&&"success"===n.status?t(n.results[0].weather_data[0]):n?a.a.error(n.status):a.a.error("\u8bf7\u6c42\u51fa\u9519\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u662f\u5426\u6b63\u5e38\uff01")}))}(e)}))},y=function(){return new Promise((function(e,t){p()("https://api.map.baidu.com/location/ip?ak=PFlNd9vKhGalbukR6ZIlFKzKvFsutPWV",(function(n,r){r&&0===r.status?e(r.content):(a.a.error("\u8bf7\u6c42\u5b9a\u4f4d\u63a5\u53e3\u5931\u8d25"),t("\u8bf7\u6c42\u5b9a\u4f4d\u63a5\u53e3\u5931\u8d25"))}))}))},E=function(e){return s("/manage/category/list","GET",e)},O=function(e){return s("/manage/category/add","POST",e)},k=function(e){return s("/manage/category/delete","POST",e)},j=function(e){return s("/manage/category/update","POST",e)},P=function(e){return s("/manage/product/add","POST",e)},w=function(e){return s("/manage/img/delete","POST",e)},T=function(e){return s("/manage/product/updateStatus","POST",e)},x=function(e){return s("/manage/product/update","POST",e)},I=function(e){return s("/manage/product/delete","POST",e)},S=function(e){return s("/manage/product/list","GET",e)},_=function(e){return s("/manage/product/search","GET",e)},C=function(e){return s("/manage/role/add","POST",e)},N=function(e){return s("/manage/role/delete","POST",e)},A=function(e){return s("/manage/role/list","GET",e)},z=function(e){return s("/manage/role/update","POST",e)}}},[[223,5,6]]]);