import React from 'react';

export default function Card (props) {

  return (
    <section onClick={props.handleClick} class={props.className}>
      <p>{props.name}</p>      
      <p>R$ {props.price},00</p>      
    </section>
  )
}