import React from 'react';
import Card from './card';

export default function MenuCard (props) {
 
  return (
    props.menu.length < 10 ?

    <div>
      <h3 className={props.class}>Café da Manhã</h3>     
        <section>      
          {props.menu.map((item) => 
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div>
          )}             
        </section>    
    </div> :   
    
    <div>
      <h3 className={props.class}>Hambúrgueres</h3>
        <section>      
          {props.menu.map((item) => item.category === 'almoço-janta' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section>

      <h3 className={props.class}>Acompanhamento</h3>
        <section>      
          {props.menu.map((item) => item.category === 'acompanhamento' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section>

      <h3 className={props.class}>Extras</h3>
        <section>      
          {props.menu.map((item) => item.category === 'adicional' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section> 

      <h3 className={props.class}>Bebidas</h3>
        <section>      
          {props.menu.map((item) => item.category === 'bebida' ?
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div> : false)}             
        </section>      
    </div>    
  )
}