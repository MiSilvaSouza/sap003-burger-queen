import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import { Link } from 'react-router-dom';
import DeliveredCard from '../components/deliveredcard';

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
      <DeliveredCard status={delivered} />      
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
