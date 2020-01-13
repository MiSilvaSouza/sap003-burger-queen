import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebaseUtils';
import Input from '../components/input';
import Button from '../components/button';
import MenuCard1 from '../components/menucard1';
import MenuCard2 from '../components/menucard2';


 export default function Menu() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);  
  const [total, setTotal] = useState(0);
  const [name, setName] = useState('');
  const [table, setTable] = useState('');
  const [option, setOption] = useState('');
  const [modal, setModal] = useState({status: false});
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);  

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

  const changeMenu = (elem) => {
    
    if (elem === 'breakfast') {
      setMenu(menu1);
      setShow1(true);
      setShow2(false);     
    }    
    else if (elem === 'allday') {
      setMenu(menu2);
      setShow1(false);       
      setShow2(true);
    } else {
      setMenu([]);
      setShow1(false);
      setShow2(false);
    }
  };  

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
  };

  const sendOrder = () => {
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
  }; 
     

  return (          
    <div>
      <nav className={css(styles.nav)}>
        <Button onClick={(e) => changeMenu(e.target.value)} value={'breakfast'} title={'CAFÉ DA MANHÃ'} className={css(styles.button, styles.hover)}/>
        <Button onClick={(e) => changeMenu(e.target.value)} value={'allday'} title={'ALMOÇO / JANTA'} className={css(styles.button, styles.hover)}/>
      </nav>
      <section className={css(styles.orders)}>
        <form className={css(styles.form)}>
          <Input type={'text'} value={name} className={css(styles.input)} placeholder={'Cliente'} onChange={(e) => setName(e.target.value)} />
          <Input type={'text'} value={table} className={css(styles.input)} placeholder={'Mesa'} onChange={(e) => setTable(e.target.value)} />        
        </form>
      <hr></hr>
      <h1 className={css(styles.nav)}>PEDIDOS</h1>     
      {orders.map(item =>      
      <p>{item.count} - R$ {item.price},00 - {item.name} <Button className={css(styles.delete)} id={orders.id} onClick={() => deleteItem(item)} title={'X'} /></p>                   
      )}
      <hr></hr>
      <p><strong>R$ {total},00 - TOTAL</strong></p>          
      <Button onClick={(e) => sendOrder(e)} title={'Enviar'} className={css(styles.card, styles.hover)}/>      
      </section>
      { modal.status ? (
        <div className={css(styles.modal)}>
          <h3>Opções</h3>
          {modal.item.option.map((elem, index) =>
            <div key={index} className={css(styles.option)}>
              <Input type={'radio'} name={'option'} value={elem} onChange={() => setOption(elem)} />
              <label> {elem} </label>
            </div>
          )}
          <Button onClick={() => addOptions()} title={'Adicionar'} />          
        </div>        
      ) : false}
      { show1 ? (
        <MenuCard1 className2={css(styles.h3)} menu={menu} onClick={verifyOptions} className={css(styles.card, styles.hover)}/>
      ) : false}

      { show2 ? (
        <MenuCard2 className2={css(styles.h3)} menu={menu} onClick={verifyOptions} className={css(styles.card, styles.hover)}/>
      ) : false}                                  
    </div>    
  );
};

const styles = StyleSheet.create({

  nav: {
    textAlign: 'center',
    background: '#3B1910',
    color: '#EEECE6',
    display: 'flex',
    justifyContent: 'center',        
  },
  
  form: {    
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
    marginRight: '10px',   
    float: 'right',
    width: '370px',    
    background: '#D0A991',
    '@media (min-width: 1024px)': {
      width: '400px',
      marginRight: '30px',
    },          
  },

  h3: {
    marginTop: '15px',
    marginLeft: '10px',
  },

  card: {
    marginTop: '10px', 
    padding: '10px',
    marginLeft: '10px',
    marginRight: '550px',   
    textAlign: 'center',    
    border: 'none',  
    borderRadius: '5px',
    cursor: 'pointer',
    background: '#3B1910',
    color: '#EEECE6',
    fontSize: '16px',
    fontWeight: 'bold',
    '@media (min-width: 1024px)': {      
      marginRight: '680px',
    },   
  },

  hover: {
    ':hover': {
        opacity: 0.7,
    }
},

modal: {
  marginTop: '20px', 
  padding: '10px',
  marginLeft: '10px',
  marginRight: '550px',      
  border: 'none',  
  borderRadius: '5px',  
  background: '#3B1910',
  color: '#EEECE6',
  fontSize: '16px',
  '@media (min-width: 1024px)': {      
    marginRight: '680px',
  },   
},

option: {   
  padding: '10px', 
  fontSize: '18px',   
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