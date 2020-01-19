import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebaseUtils';
import KitchenCard from '../components/kitchencard';
import NavKitchen from '../components/navkitchen';

export default function Delivered() {
  const [delivered, setDelivered] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders')
      .where('status', '==', 'Entregue')      
      .onSnapshot((snap) => {
        const history = snap.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))        
        setDelivered(history);
      })
  }, []);


  return (
    <div>
      <NavKitchen />
      <KitchenCard status={delivered} />      
    </div>
  )
};
