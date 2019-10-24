import React from 'react';
import {Button} from 'antd'
export default function(props){
  return (
    <a href={props.href} target='_blank'>{props.content}</a>
  )
}