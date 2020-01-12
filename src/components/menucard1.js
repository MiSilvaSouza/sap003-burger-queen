import React from 'react';
import Card from './card';

export default function MenuCard1 (props) {

  return (
    <div>
      <h3 class={props.className2}>Café da Manhã</h3>     
        <section>      
          {props.menu.map((item) => 
            <div> 
              <Card name={item.name} price={item.price} className={props.className} onClick={() => props.onClick(item)} />
            </div>
          )}             
        </section>    
    </div>    
  )
}