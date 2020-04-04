import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
  PureComponent
} from "react";
import { Card, Col, Row, Button } from "antd";
let timer;
function ajax(param) {
  return new Promise(resolve => {
    console.log("promise render");
    timer = setTimeout(() => {
      resolve("我是后台返回的内容" + param);
    }, 500);
  });
}
// 自定义 Hooks 必须以use开头
function useNumber(defaultNumber) {
  let [number, setNumber] = useState(defaultNumber);
  const ref = useRef()
  useEffect(() => {
   ref.current = setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);
  }, []);
  useEffect(()=>{
    if(number>=10){
      clearTimeout(ref.current)
    }
  })
  return [number, setNumber];
}
function Counter1() {
  let [number, setNumber] = useNumber(0);
  return (
    <Button
      type="primary"
      onClick={() => {
        setNumber(number + 10);
      }}
    >
      点击加10 : {number}
    </Button>
  );
}

function test() {
  console.log("test render");
  return { a: 1 };
}
const ThemeContext = React.createContext();
function Context() {
  // 类似 contextType
  const test = useContext(ThemeContext);
  return <span>{test}</span>;
}

// 注意：不能在函数组上件创建 ref 要用类组件
// function Ref(){
//   return (
//     <div>ref</div>
//   )
// }

class Ref extends PureComponent {
  refFoo() {
    console.log("我是子组件方法");
  }
  render() {
    return <div>ref</div>;
  }
}

function Hooks() {
  // 每一个 Hooks 相互独立
  // 必须把hooks写在函数的最外层
  // 不能写在 if...else 等条件语句当中
  console.log("Hooks render");
  const [count, setCount] = useState(0);
  const [content, setContent] = useState("loading");
  const [query, setQuery] = useState(0);
  // 惰性 useState
  const [computed, setComputed] = useState(() => test());

  // useMemo
  const [testUseMemo, setTestUseMemo] = useState(0);

  // useEffect 相当于 componentDidMount 和 componentDidUpdate、componentWillUnmount
  // 在这里进行 ajax 数据请求，添加一些监听的注册和取消注册，手动修改dom等操作
  // 给每个产生副作用的操作单独写一个 useEffect，每次 render 都会调用。
  // useEffect 是异步执行的不会阻碍浏览器的更新视图，componentDidMount或componentDidUpdate中的代码则是同步执行

  // 获取 Dom
  useEffect(() => {
    document.title = `点击了${count}次`;
  });

  // 异步请求 ，清除 timeout
  useEffect(() => {
    const getData = async () => {
      const res = await ajax(query);
      console.log(res);
      setContent(res);
    };
    getData();
    return ()=> {
      if (timer) {
        console.log("clear timer",timer);
        clearTimeout(timer);
      }
    };
  }, [query]); // 传空数组只会执行一次

  // useMemo 有返回值可用于渲染（在渲染期间获得返回值并用于渲染）
  const newCount = useMemo(() => {
    return count * 2;
  }, [count]);
  const ref = useRef();
  // console.log(ref);
  // const testUseCallBack = useMemo(()=>{
  //   return function(){
  //     setTestUseMemo(testUseMemo+1)
  //   }
  // },[])
  // 等价于上面的写法
  const testUseCallBack = useCallback(() => {
    setTestUseMemo(testUseMemo + 1);
  }, [testUseMemo]);

  const refTimer = useRef();
  // 用 ref 保存变量
  useEffect(() => {
    refTimer.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count >= 3) {
      clearTimeout(refTimer.current);
    }
  });

  return (
    <div>
      <div style={{ padding: "30px" }}>
        <Row gutter={6}>
          <Col span={8}>
            <Card title="useState useEffect">
              <p>数量加一且改变页面title,count:{count}</p>
              <Button
                size="small"
                type="primary"
                onClick={() => setCount(count + 1)}
              >
                + 1
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="useEffect">
              1s 后从后台获取 content：
              {content}
              <Button
                size="small"
                type="primary"
                onClick={() => setQuery(query + 1)}
              >
                ajax
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="自定义 Hooks">
              <p>number>=10停止</p>
              <p>自定义hooks的目的就是为了代码复用</p>
              <Counter1 />
            </Card>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={8}>
            <Card title="惰性 useState">
              <p>
                获取 state
                的初始值较为复杂,初始值放入其它函数计算,这样不会引起重复渲染
              </p>
              <pre>useState(()=> fn())</pre>
              {computed.a}
              <Button
                size="small"
                type="primary"
                onClick={() => setComputed({ ...computed, a: computed.a + 1 })}
              >
                + 1
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="useContext">
              <p>和createContext基本类似，类似contextType</p>
              <ThemeContext.Provider value={"dark"}>
                <Context />
              </ThemeContext.Provider>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="useMemo">
              <p>判断函数是否重复执行，达到性能优化的目的</p>
              <p>限制条件 count === 2</p>
              count:{count}&nbsp; newCount:{newCount}
              <div>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setCount(count + 1)}
                >
                  + 1
                </Button>

                <Button size="small" type="primary" onClick={testUseCallBack}>
                  {testUseMemo}
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={6}>
          <Col span={8}>
            <Card title="useRef">
              count: {count} >=3 的时候停止
              <Ref ref={ref} />
              <Button
                size="small"
                type="primary"
                onClick={() => ref.current.refFoo()}
              >
                获取子组件方法
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Hooks;
