import React, {useState, useEffect} from 'react';

import firebase from '../utils/firebaseUtils';

import KitchenCard from '../components/kitchencard';
import NavKitchen from '../components/navkitchen';

export default function Kitchen() {
  
  const [peding, setPeding] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders')
      .where('status', '==', 'Pendente')     
      .onSnapshot((snap) => {
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
      <NavKitchen />  
      <KitchenCard status={peding} onClick={changeStatus} title={'Pronto'}/>          
    </div>
  )
};

