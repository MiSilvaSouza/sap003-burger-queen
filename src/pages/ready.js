import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import { Link } from 'react-router-dom';
import ReadyCard from '../components/readycard';

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

  const changeStatus = (item) => {  
    const time2 = new Date(item.time2.toDate().toLocaleString('pt-BR'));
    const time1 = new Date(item.time1.toDate().toLocaleString('pt-BR'));
    const difftime = Math.round(((time2.getTime() - time1.getTime()) / 1000) / 60);   

    firebase.firestore().collection('orders').doc(item.id).update({
      status: 'Entregue',
      difftime: difftime,
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
      <ReadyCard status={ready} onClick={changeStatus} title={'Entregue'}/>      
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
