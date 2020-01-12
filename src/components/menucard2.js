import React from 'react';
import Card from './card';

export default function MenuCard2 (props) {

  return (
    <div>
      <h3 class={props.className2}>Hambúrgueres</h3>
        <section>      
          {props.menu.map((item) => item.category === 'almoço-janta' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section>

      <h3 class={props.className2}>Acompanhamento</h3>
        <section>      
          {props.menu.map((item) => item.category === 'acompanhamento' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section>

      <h3 class={props.className2}>Extras</h3>
        <section>      
          {props.menu.map((item) => item.category === 'adicional' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section> 

      <h3 class={props.className2}>Bebidas</h3>
        <section>      
          {props.menu.map((item) => item.category === 'bebida' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section>      
    </div>    
  )
}