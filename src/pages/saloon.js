import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, css } from 'aphrodite';
import { db, serverTimestamp } from '../utils/firebaseUtils';
import { collection, getDocs, addDoc, orderBy, query } from 'firebase/firestore';
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
  
  const breakfast = useMemo(() => data.filter(item => item.category === 'café'), [data]);
  const allday = useMemo(() => data.filter(item => item.category !== 'café'), [data]);
  
  useEffect(() => {
    setMenu([...breakfast]);            
  }, [breakfast]);
  
  useEffect(() => {
    const fetchMenu = async () => {
      const menuQuery = query(collection(db, 'menu'), orderBy('name'));
      const snap = await getDocs(menuQuery);
      const dataMenu = snap.docs.map((item) => ({
        id: item.id,
        count: 0,
        ...item.data()
      }))
      setData(dataMenu);
    };
    fetchMenu();
  }, []);
  

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
        time1: serverTimestamp(),
        time2: serverTimestamp(),
        difftime: 0     
      }    
      
      addDoc(collection(db, 'orders'), orderClient);
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
       <MenuCard class={css(styles.h3)} class1={css(styles.divmenu)} menu={menu} onClick={verifyOptions} className={css(styles.card, styles.hover)}/>   
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
    '@media (min-width: 850px)': {      
      marginRight: '160px',
      marginLeft: '160px', 
    },
    '@media (min-width: 1025px)': {   
      marginRight: '460px',
      marginLeft: '460px', 
    }
  },

  nav: {
    display: 'flex',
    justifyContent:'space-between',
    marginRight: '160px',
    marginLeft: '160px',    
    '@media (min-width: 850px)': {   
      marginRight: '260px',
      marginLeft: '260px', 
    },  
    '@media (min-width: 1025px)': {   
      marginRight: '460px',
      marginLeft: '460px', 
    }
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
    marginRight: '10px',        
    background: '#D0A991',
    height: '50%',
    border: '2px solid #3B1910'         
  },

  h3: {
    marginTop: '10px',
    marginLeft: '10px',
  },
  divmenu: {
    display: 'flex', 
    flexWrap:'wrap',
    width: '50%',
    margin: '5px' 
  },

  card: {    
    width: '210px',    
    margin: '5px',
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