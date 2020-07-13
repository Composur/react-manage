import React, { Component } from 'react';
import { FixedSizeList as List } from 'react-window';
import AntoSize from 'react-virtualized-auto-sizer';
import './style.css';

const Row = ({ style, index }) => (
  <div style={style} className={index & 1 ? 'odd' : 'even'}>
    Row
    {' '}
    {index}
    {' '}
    {index & 1 ? 'even' : 'odd'}
  </div>
);
const Example = () => (
  <AntoSize>
    {({ width, height }) => (
      <List
        className="list"
        height={height}
        itemCount={200}
        itemSize={35}
        width={width}
      >
        {Row}
      </List>
    )}
  </AntoSize>
);
export default class BigTable extends Component {
  render() {
    return (
      <div className="container">
        <Example />
      </div>
    );
  }
}
