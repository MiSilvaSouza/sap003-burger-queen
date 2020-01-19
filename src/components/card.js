import React from 'react';

export default function Card (props) {

  return (
    <section onClick={props.onClick} className={props.className}>
      <p>{props.name}</p>      
      <p>R$ {props.price},00</p>      
    </section>
  )
};