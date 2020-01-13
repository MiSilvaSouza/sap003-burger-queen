import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import { Link } from 'react-router-dom';
import PedingCard from '../components/pedingcard';

export default function Pending() {
  
  const [peding, setPeding] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders')
      .where('status', '==', 'Pendente')
      .get()
      .then((snap) => {
        const orderPeding = snap.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))           
        setPeding(orderPeding);
      })
  }, []);

  const changeStatus = (item) => {    
    firebase.firestore().collection('orders').doc(item.id)
      .update({
        status: 'Pronto',
        time2: firebase.firestore.FieldValue.serverTimestamp(),        
      })                    
  };
  
  return (
    <div>
      <h1 className={css(styles.h1)}>PEDIDOS</h1>
      <span className={css(styles.pagesOrder, styles.hover)}>
        <Link to='/pending' className={css(styles.link, styles.hover)}>Pendentes</Link>
        <Link to='/ready' className={css(styles.link, styles.hover)}>Prontos</Link>
        <Link to='/delivered' className={css(styles.link, styles.hover)}>Entregues</Link>
      </span>      
      <PedingCard status={peding} onClick={changeStatus} title={'Pronto'}/>          
    </div>
  )
};

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
