import React, {useState, useEffect} from 'react';

import { db, serverTimestamp } from '../utils/firebaseUtils';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';

import KitchenCard from '../components/kitchencard';
import NavKitchen from '../components/navkitchen';

export default function Kitchen() {
  
  const [peding, setPeding] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), where('status', '==', 'Pendente'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const orderPeding = snap.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))           
      setPeding(orderPeding);
    });
    return () => unsubscribe();
  }, []);

  const changeStatus = (item) => {    
    const orderRef = doc(db, 'orders', item.id);
    updateDoc(orderRef, {
      status: 'Pronto',
      time2: serverTimestamp(),        
    });                    
  };
  
  return (
    <div>
      <NavKitchen />  
      <KitchenCard status={peding} onClick={changeStatus} title={'Pronto'}/>          
    </div>
  )
};

