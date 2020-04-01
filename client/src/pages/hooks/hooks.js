import React, { useState, useEffect, memo } from "react";
import { Button } from "antd";
let timer;
function ajax() {
  return new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      resolve("我是后台返回的内容");
    }, 1000);
  });
}
// 自定义 Hooks 必须以use开头
function useNumber() {
  let [number, setNumber] = useState(0);
  useEffect(() => {
    console.log("useNumber render");
    let timer = setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);
  },[]);
  return [number, setNumber];
}
function Counter1() {
  let [number, setNumber] = useNumber();
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
function test(props) {
  console.log("test");
  return { count: props.number };
}
function Hooks() {
  // 每一个 Hooks 相互独立
  // 必须把hooks写在函数的最外层
  // 不能写在 if...else 等条件语句当中
  console.log("Hooks render");
  const [count, setCount] = useState(0);
  const [content, setContent] = useState("loading");

  const [number, setNumber] = useState(test({ number: 123 }));

  // const [permissions,setPermissions] = useGetPermissions('123')
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
    console.log(1);
    ajax().then(data => {
      setContent(data);
    });
    return function clear() {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [content]); // 只有当count的值发生变化时，才会重新执行，只会首次渲染的时候执行。少用，或者不用这个特性。

  function Counter() {
    const [counter, setCounter] = useState({
      name: "计数器",
      number: 0,
      count: 0
    });
    console.log("render Counter");
    // 如果你修改状态的时候，传的状态值没有变化，则不重新渲染
    return (
      <>
        <p>
          {counter.name}number:{counter.number}count:{counter.count}
        </p>
        <button
          onClick={() =>
            setCounter({
              ...counter,
              number: counter.number + 1,
              count: counter.count + 1
            })
          }
        >
          +
        </button>
      </>
    );
  }

  return (
    <div>
      <h1>{count}</h1>
      <p>{content}</p>
      <Button size="small" type="primary" onClick={() => setCount(count + 1)}>
        加一
      </Button>
      <Counter1 />
    </div>
  );
}

export default Hooks;
