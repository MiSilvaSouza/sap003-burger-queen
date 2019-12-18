import React from 'react';

export default function Card (props) {

  return (
    <section onClick={props.handleClick}>
      <p>{props.name}</p>
      <p>{props.price}</p>      
    </section>
  )
}