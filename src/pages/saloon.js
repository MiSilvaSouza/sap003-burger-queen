import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import Input from '../components/input';
import Card from '../components/card';
import Button from '../components/button';


 export default function Menu() {
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
          ...item.data()
        }))
        setMenu(dataMenu);
      })            
  }, []);
  
  const menu1 = menu.filter(item => item.breakfast === true);
  const menu2 = menu.filter(item => item.breakfast === false);

  function order(event) {
    setTotal(+(total + event.price));  
    setOrders([...orders, event]);       
  }

  function sendOrder() {
    const orderClient = {
      client: name,
      table: table,
      order: orders,
      total: total,
      status: 'Pedido Enviado',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }    
    
    firebase.firestore().collection('orders').add(orderClient);
    setName('');
    setTable('');
    setOrders([]);
    setTotal(0);          
  }

  function deleteItem(item) {  
    const deleteTotal = total - item.price;
    const index = orders.indexOf(item);
    orders.splice(index, 1);
    setOrders([...orders]);
    setTotal(deleteTotal);         
  }
     

  return (          
    <div>
      <form className={css(styles.form)}>
        <Input type={'text'} value={name} className={css(styles.input)} placeholder={'Cliente'} onChange={(e) => setName(e.target.value)} />
        <Input type={'text'} value={table} className={css(styles.input)} placeholder={'Mesa'} onChange={(e) => setTable(e.target.value)} />        
      </form>
      <br></br>
      <section className={css(styles.orders)}>
      <p><strong>Cliente: {name}</strong></p>
      <p><strong>Mesa: {table}</strong></p>
      <hr></hr>
      <h1>PEDIDOS</h1>     
      {orders.map(item =>      
      <p>R$ {item.price},00 - {item.name} <Button id={orders.id} onClick={() => deleteItem(item)} title={'X'} /></p>                   
      )}
      <hr></hr>
      <p><strong>R$ {total},00 - TOTAL</strong></p>
      <br></br>
      <Button onClick={(e) => sendOrder(e)} title={'Enviar'} className={css(styles.card, styles.hover)}/>      
      </section>       
      <br></br>
      <h1>CAFÉ DA MANHÃ</h1>
      {menu1.map(item =>
      <Card name={item.name} price={item.price} className={css(styles.card, styles.hover)} handleClick={() => order(item)} />      
    )}
      <br></br>
      <h1>ALMOÇO / JANTA</h1>
      {menu2.map(item =>
      <Card name={item.name} price={item.price} className={css(styles.card, styles.hover)} handleClick={() => order(item)} />      
    )}                    
    </div>    
  );
}

const styles = StyleSheet.create({
  
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
    width: '30%',
    marginRight: '10px',
    background: 'rgba(59, 25, 16, 0.3)',
       
  },

  card: {
    marginTop: '10px', 
    padding: '5px',
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
   
 /*  media: {
      '@media (min-width: 1025px)': {
          justifyContent: 'space-between',
      }
  } */
});