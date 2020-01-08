import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import Input from '../components/input';
import Card from '../components/card';
import Button from '../components/button';


 export default function Menu() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);  
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [table, setTable] = useState('');

  useEffect(() => {
    firebase.firestore().collection('menu').orderBy('name')
      .get()
      .then((snap) => {
        const dataMenu = snap.docs.map((item) => ({
          id: item.id,
          count: 0,
          ...item.data()
        }))
        setData(dataMenu);
      })            
  }, []);
  
  const menu1 = data.filter(item => item.category === 'café');
  const menu2 = data.filter(item => item.category !== 'café');
  

  function order(item) {
    if (orders.includes(item) === true) {
      item.count++;
      setTotal(+(total + item.price * item.count));
    } else {
      item.count = 1;        
      setOrders([...orders, item]);
    }
    setTotal(+(total + item.price));          
  }

  function deleteItem(item) {
    if (item.count === 1) {
      const deleteTotal = total - item.price;
      const index = orders.indexOf(item);
      orders.splice(index, 1);
      setOrders([...orders]);
      setTotal(deleteTotal);
    } else {
      item.count--;
      const deleteTotal = total - item.price;
      setTotal(deleteTotal);
    }            
  }

  function sendOrder() {
    const orderClient = {
      client: name,
      table: table,
      order: orders,
      total: total,
      status: 'Pendente',
      time1: firebase.firestore.FieldValue.serverTimestamp(),
      time2: firebase.firestore.FieldValue.serverTimestamp(),
      difftime: 0     
    }    
    
    firebase.firestore().collection('orders').add(orderClient);
    setName('');
    setTable('');
    setOrders([]);
    setTotal(0);          
  } 
     

  return (          
    <div>
      <nav className={css(styles.nav)}>
        <Button onClick={() => setMenu(menu1)} title={'CAFÉ DA MANHÃ'} className={css(styles.button, styles.hover)}/>
        <Button onClick={() => setMenu(menu2)} title={'ALMOÇO / JANTA'} className={css(styles.button, styles.hover)}/>
      </nav>            
      <section className={css(styles.orders)}>
        <form className={css(styles.form)}>
          <Input type={'text'} value={name} className={css(styles.input)} placeholder={'Cliente'} onChange={(e) => setName(e.target.value)} />
          <Input type={'text'} value={table} className={css(styles.input)} placeholder={'Mesa'} onChange={(e) => setTable(e.target.value)} />        
        </form>
      <hr></hr>
      <h1 className={css(styles.nav)}>PEDIDOS</h1>     
      {orders.map(item =>      
      <p>{item.count} - R$ {item.price},00 - {item.name} <Button id={orders.id} onClick={() => deleteItem(item)} title={'X'} /></p>                   
      )}
      <hr></hr>
      <p><strong>R$ {total},00 - TOTAL</strong></p>
      <br></br>
      <Button onClick={(e) => sendOrder(e)} title={'Enviar'} className={css(styles.card, styles.hover)}/>      
      </section>       
      <br></br>      
      {menu.map(item =>
      <Card name={item.name} price={item.price} className={css(styles.card, styles.hover)} handleClick={() => order(item)} />      
    )}                           
    </div>    
  );
}

const styles = StyleSheet.create({

  nav: {
    textAlign: 'center',
    background: '#3B1910',
    color: '#EEECE6',
    display: 'flex',
    justifyContent: 'center',        
  },
  
  form: {  
    height: 'auto',
    background: '#D0A991',
    padding: '5px',  
  },
  
  input: {
    margin: '2px auto', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
      
  },
  
  orders: {
    marginTop: '25px',   
    float: 'right',
    width: '50%',
    marginRight: '10px',
    background: '#D0A991',
       
  },

  card: {
    marginTop: '10px', 
    padding: '5px',
    marginLeft: '10px',
    marginRight: '500px',   
    textAlign: 'center',    
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#3B1910',
    color: '#EEECE6',
    fontSize: '16px',
    fontWeight: 'bold', 
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},

button: {
  margin: '10px', 
  padding: '5px',     
  textAlign: 'center',    
  border: 'none',  
  borderRadius: '5px',
  cursor: 'pointer',
  background: '#EEECE6',
  color: '#3B1910',
  fontSize: '16px',
  fontWeight: 'bold', 
},
   
 /*  media: {
      '@media (min-width: 1025px)': {
          justifyContent: 'space-between',
      }
  } */
});