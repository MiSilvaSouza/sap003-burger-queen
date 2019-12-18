import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import Button from '../components/button';
import Input from '../components/input';


 export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);

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

  function Pedidos(event) {    
    setOrders([...orders, event])  
  }   

  return (          
    <div>
      <form className={css(styles.form)}>
        <Input type={'text'} name={'client'} className={css(styles.input)} placeholder={'Cliente'} onChange={(e) => console.log(e)} />
        <Input type={'text'} name={'client'} className={css(styles.input)} placeholder={'Mesa'} onChange={(e) => console.log(e)} />           
      </form>
      <br></br>
      {orders.map(item =>      
      <p>R$ {item.price},00 - {item.name}</p>        
      )}
      <br></br>
      <p>CAFÉ DA MANHÃ</p>
      {menu1.map(item =>
      <Button id={item.id} className={css(styles.button, styles.hover)} onClick={() => Pedidos(item)} title={`${item.name} - R$ ${item.price},00`} />      
    )}
      <br></br>
      <p>ALMOÇO / JANTA</p>
      {menu2.map(item =>
      <Button id={item.id} className={css(styles.button, styles.hover)} onClick={() => Pedidos(item)} title={`${item.name} - R$ ${item.price},00`} />      
    )}                    
    </div>    
  );
}

const styles = StyleSheet.create({
  form: {  
    height: '100px',
    background: '#D0A991',
    paddingTop: '5px',  
  },
  
  input: {
    margin: '2px auto', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',  
  },
  
  button: {
    marginTop: '10px', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center', 
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