import React, {useState, useEffect} from 'react';
import { db } from '../utils/firebaseUtils';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import KitchenCard from '../components/kitchencard';
import NavKitchen from '../components/navkitchen';

export default function Ready() {
  
  const [ready, setReady] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), where('status', '==', 'Pronto'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const history = snap.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))        
      setReady(history);
    });
    return () => unsubscribe();
  }, []);

  const changeStatus = (item) => {  
    const time2 = new Date(item.time2.toDate().toLocaleString('pt-BR'));
    const time1 = new Date(item.time1.toDate().toLocaleString('pt-BR'));
    const difftime = Math.round(((time2.getTime() - time1.getTime()) / 1000) / 60);   

    const orderRef = doc(db, 'orders', item.id);
    updateDoc(orderRef, {
      status: 'Entregue',
      difftime: difftime,
    });           
  };

  return (
    <div>      
      <NavKitchen />
      <KitchenCard status={ready} onClick={changeStatus} title={'Entregue'}/>      
    </div>
  )
};
