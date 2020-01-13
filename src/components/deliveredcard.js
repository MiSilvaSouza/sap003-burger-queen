import React from 'react';
import { StyleSheet, css } from 'aphrodite';


export default function DeliveredCard (props) {

  return (
    <div className={css(styles.main)}>
      {props.status.map(item =>
      <section className={css(styles.card)}>                
        <p>Status: {item.status}</p>
        <p>Cliente: {item.client}</p>
        <p>Mesa: {item.table}</p>
        <p>Pedido:</p>
        {item.order.map(item =>          
          <ul className={css(styles.list)}>            
            <li>{item.count} - R$ {item.price},00 - {item.name}</li>
          </ul> 
        )}              
        <p><strong>R$ {item.total},00 - TOTAL</strong></p>        
        <p>Tempo de preparo: {item.difftime} minuto(s)</p>               
      </section>      
      )}       
    </div>    
  )
};

const styles = StyleSheet.create({

  main: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',    
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: '10px',
    marginLeft: '15px',
    marginRight: '15px',
  },

  card: {
    marginTop: '10px', 
    padding: '10px',
    width: '350px',      
    borderRadius: '5px',   
    background: '#D0A991',    
    fontSize: '16px',    
    '@media (min-width: 1024px)': {      
      marginRight: '680px',
    },   
  },

  list: {
    listStyleType: 'none',
  }

});