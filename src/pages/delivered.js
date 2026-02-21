import React, {useState, useEffect} from 'react';
import { db } from '../utils/firebaseUtils';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import KitchenCard from '../components/kitchencard';
import NavKitchen from '../components/navkitchen';

export default function Delivered() {
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), where('status', '==', 'Entregue'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const history = snap.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }))        
      setDelivered(history);
    });
    return () => unsubscribe();
  }, []);


  return (
    <div>
      <NavKitchen />
      <KitchenCard status={delivered} />      
    </div>
  )
};
