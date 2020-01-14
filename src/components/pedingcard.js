import React from 'react';
import Button from './button';
import { StyleSheet, css } from 'aphrodite';


export default function PendingCard (props) {

  return (
    <div className={css(styles.main)}>
      {props.status.map(item =>
      <section className={css(styles.card)}>
        <Button id={item.id} onClick={() => props.onClick(item)} title={props.title} className={css(styles.button, styles.hover)} />        
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
        <p>Data e Hora: {item.time1.toDate().toLocaleString('pt-BR')}</p>               
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
  },

  button: {
    float: 'right',
    padding: '5px',     
    textAlign: 'center',    
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#EEECE6',
    color: '#3B1910',    
    fontWeight: 'bold', 
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},

  card: {
    marginTop: '10px', 
    padding: '10px',
    width: '350px',      
    borderRadius: '5px',   
    background: '#D0A991',    
    fontSize: '16px',    
  },

  list: {
    listStyleType: 'none',
  }

});