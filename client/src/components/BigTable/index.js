import React, { Component } from "react";
import { FixedSizeList as List } from "react-window";
import AntoSize from "react-virtualized-auto-sizer";
import "./style.css";
const Row = ({ style, index }) => {
  return (
    <div style={style} className={index % 2 === 0 ? "odd" : "even"}>
      Row {index}
    </div>
  );
};
const Example = () => (
  <AntoSize>
    {({ width, height }) => {
      return (
        <List
          className='list'
          height={height}
          itemCount={200}
          itemSize={35}
          width={width}
        >
          {Row}
        </List>
      );
    }}
  </AntoSize>
);
export default class BigTable extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='container'>
        <Example/>
      </div>
    );
  }
}
