import React from 'react';

export default function Button(props) {

  return (
    <button 
    onClick={props.onClick}
    value={props.value} 
    id={props.id}    
    className={props.className} 
    >{props.title}
    </button>
  ) 
} 
