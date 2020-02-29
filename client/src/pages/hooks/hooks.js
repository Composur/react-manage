import React ,{useState,useEffect} from 'react'

function Example() {
  // useState 的唯一参数就是 state 0
  // 声明一个新的叫做 “count” 的 state 变量 ，和一个 操作 count 的函数 setCount
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });
  const updateCount = ()=>{
    setCount(count+1)
  }
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={updateCount}> 
        Click me
      </button>
    </div>
  );
}

export default Example

