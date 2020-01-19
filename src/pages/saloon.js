import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import Input from '../components/input';
import Button from '../components/button';
import MenuCard from '../components/menucard';
import growl from 'growl-alert';
import 'growl-alert/dist/growl-alert.css';


 export default function Menu() {
  const [data, setData] = useState([]); 
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);  
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [table, setTable] = useState('');
  const [option, setOption] = useState('');
  const [modal, setModal] = useState({status: false});
  
  useEffect(() => {
    setMenu([...breakfast]);            
  }, [data]);
  
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
  
  const breakfast = data.filter(item => item.category === 'café');
  const allday = data.filter(item => item.category !== 'café');
 

  const order = (item) => {

    const index = orders.findIndex((e) => e.name === item.name);    
    
    if (index === -1) {           
      setOrders([...orders, {...item, count: 1}]);

    } else {       
      orders[index].count++;   
      setTotal(+(total + item.price * item.count));
    }
    setTotal(+(total + item.price));           
  };

  const verifyOptions = (item) => {    
     if (item.option) {      
      setModal({status: true, item: item});   
    } else {      
      order(item);     
    }        
  };

  const addOptions = () => {
    const updateItem = {...modal.item, name: `${modal.item.name} ${option}`}    
    order(updateItem);
    setModal({status: false});            
 };

  const deleteItem = (item) => {
    if (item.count === 1) {
      const filterItens = orders.filter(elem => elem !== item); 
      setOrders([...filterItens]);
      setTotal(total - item.price);
    } else {
      item.count--;     
      setTotal(total - item.price);
    }            
  };

  const sendOrder = () => {

    if (name === '') {
      growl.error({text: 'Informe o nome do cliente', fadeAway: true, fadeAwayTimeout: 3000});
    }
    else if (table === '') {
      growl.error({text: 'Informe o número da mesa', fadeAway: true, fadeAwayTimeout: 3000});      
    }
    else if (!orders.length) {
      growl.error({text: 'Escolha um item', fadeAway: true, fadeAwayTimeout: 3000});
    } 
    else {
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
      growl.success({text: 'Pedido Enviado', fadeAway: true, fadeAwayTimeout: 3000});
      setName('');
      setTable('');
      setOrders([]);
      setTotal(0); 
    } 
  }; 
     

  return (          
    <div>
      <h1 className={css(styles.h1)}>CARDÁPIO</h1>
      <nav className={css(styles.nav)}>
        <Button onClick={() => setMenu(breakfast)} value={'breakfast'} title={'CAFÉ DA MANHÃ'} />
        <Button onClick={() => setMenu(allday)} value={'allday'} title={'ALMOÇO / JANTA'} />
      </nav>     
      <div className={css(styles.main)}>
       <MenuCard class={css(styles.h3)} menu={menu} onClick={verifyOptions} className={css(styles.card, styles.hover)}/>   
        { modal.status ? (
        <div className={css(styles.modal)}>
          <h3>Opções</h3>
          {modal.item.option.map((elem, index) =>
            <div key={index} className={css(styles.option)}>
              <Input type={'radio'} name={'option'} value={elem} onChange={() => setOption(elem)} />
              <label> {elem} </label>
            </div>
          )}
          <Button onClick={() => addOptions()} title={'Adicionar'} className={css(styles.button, styles.hover)} />          
        </div>        
        ) : false}
        <aside className={css(styles.orders)}>
          <form className={css(styles.form)}>
            <Input type={'text'} value={name} className={css(styles.input)} placeholder={'Cliente'} onChange={(e) => setName(e.target.value)} />
            <Input type={'text'} value={table} className={css(styles.input)} placeholder={'Mesa'} onChange={(e) => setTable(e.target.value)} />        
          </form>        
          <h1 className={css(styles.h1)}>PEDIDOS</h1>     
          {orders.map(item =>      
          <p>{item.count} - R$ {item.price},00 - {item.name} <Button className={css(styles.delete)} id={orders.id} onClick={() => deleteItem(item)} title={'X'} /></p>                   
          )}
          <hr></hr>
          <p><strong>R$ {total},00 - TOTAL</strong></p>          
          <Button onClick={(e) => sendOrder(e)} title={'Enviar'} className={css(styles.button, styles.hover)} />      
        </aside>           
      </div>     
    </div>    
  );
};

const styles = StyleSheet.create({

  main: {
    display: 'flex',    
    justifyContent:'space-around',
  },

  nav: {
    display: 'flex',
    justifyContent:'space-between',
    marginRight: '160px',
    marginLeft: '160px', 
  },

  h1: {
    textAlign: 'center',
    background: '#3B1910',
    color: '#EEECE6',
    padding: '10px',
  },
  
  form: {    
    background: '#D0A991',
    padding: '0 20px 20px 20px',  
  },
  
  input: {
    margin: '20px 2px auto', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',      
  },
  
  orders: {
    marginTop: '60px',        
    background: '#D0A991',
    height: '50%',
    border: '2px solid #3B1910'         
  },

  h3: {
    marginTop: '25px',
    marginLeft: '10px',
  },

  card: {    
    width: '210px',    
    marginTop: '10px', 
    padding: '30px',      
    textAlign: 'center',    
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#3B1910',
    color: '#EEECE6',
    fontSize: '20px',
    fontWeight: 'bold',     
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},

modal: {
  marginTop: '60px', 
  padding: '10px',
  marginRight: '10px',
  marginLeft: '10px',     
  border: 'none',  
  borderRadius: '5px',  
  background: '#3B1910',
  color: '#EEECE6',
  fontSize: '16px',
  height: '50%',
},

option: {   
  padding: '10px', 
  fontSize: '18px',   
},

button: {
  margin: '10px', 
  padding: '15px',     
  textAlign: 'center',    
  border: 'none',  
  borderRadius: '5px',
  cursor: 'pointer',
  background: '#EEECE6',
  color: '#3B1910',
  fontSize: '16px',
  fontWeight: 'bold',
  boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)' 
},

delete: {  
  padding: '5px',     
  textAlign: 'center',    
  border: 'none',  
  borderRadius: '5px',
  cursor: 'pointer',
  background: '#D0A991',
  color: '#3B1910',
  fontSize: '16px',
  fontWeight: 'bold', 
},
});