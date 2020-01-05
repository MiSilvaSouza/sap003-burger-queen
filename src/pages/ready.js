import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import { Link } from 'react-router-dom';

export default function Ready() {
  const [ready, setReady] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders')
      .where('status', '==', 'Pronto')
      .get()
      .then((snap) => {
        const history = snap.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))        
        setReady(history);
      })
  }, []);

  return (
    <div>
      <h1 className={css(styles.h1)}>PEDIDOS</h1>
      <span className={css(styles.pagesOrder, styles.hover)}>
        <Link to='/pending' className={css(styles.link, styles.hover)}>Pendentes</Link>
        <Link to='/ready' className={css(styles.link, styles.hover)}>Prontos</Link>
      </span>
      <br></br>
      {ready.map(item =>
      <section>
        <hr></hr>
        <p>{item.client}</p>
        <p>{item.table}</p>              
        <p>R$ {item.total},00</p>  
        <p>{item.status}</p>
        <p>{item.timestamp.toDate().toLocaleString('pt-BR')}</p>               
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
    marginLeft: '280px',
    marginRight: '280px',
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
