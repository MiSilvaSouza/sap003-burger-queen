import React from 'react';

export default function Button(props) {

  return (
    <button 
    onClick={props.onClick} 
    id={props.id}    
    class={props.className} 
    >{props.title}
    </button>
  ) 
} 
