import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import { Link } from 'react-router-dom';

export default function Delivered() {
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders')
      .where('status', '==', 'Entregue')
      .get()
      .then((snap) => {
        const history = snap.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))        
        setDelivered(history);
      })
  }, []);


  return (
    <div>
      <h1 className={css(styles.h1)}>PEDIDOS</h1>
      <span className={css(styles.pagesOrder, styles.hover)}>
        <Link to='/pending' className={css(styles.link, styles.hover)}>Pendentes</Link>
        <Link to='/ready' className={css(styles.link, styles.hover)}>Prontos</Link>
        <Link to='/delivered' className={css(styles.link, styles.hover)}>Entregues</Link>
      </span>
      <br></br>
      {delivered.map(item =>
      <section>
        <hr></hr>
        <p>Status: {item.status}</p>
        <p>Cliente: {item.client}</p>
        <p>Mesa: {item.table}</p>
        <p>Pedido:</p>
        {item.order.map(item =>          
          <ul>            
            <li>{item.count} - R$ {item.price},00 - {item.name}</li>
          </ul> 
        )}              
        <p><strong>R$ {item.total},00 - TOTAL</strong></p>        
        <p>Tempo de preparo: {item.difftime} minuto(s)</p>            
      </section>      
      )}      
    </div>
  )
}

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    background: '#3B1910',
    color: '#EEECE6',
  },

  pagesOrder: {
    
    display: 'flex',
    justifyContent: 'space-between',    
    marginTop: '15px',
    marginLeft: '150px',
    marginRight: '150px',
  },

  link: {    
    
    padding: '15px',     
    textAlign: 'center',    
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#3B1910',
    color: '#EEECE6',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none', 
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},
   
 
});
