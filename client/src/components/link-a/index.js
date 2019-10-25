import React from 'react';

/**
 * 
 * @param {*} @param: params object
 * @description 
 */
export default function(props){
  const {href,text,target}=props.params || {} 
  return (
    <a href={href} target={target}>{text}</a>
  )
}