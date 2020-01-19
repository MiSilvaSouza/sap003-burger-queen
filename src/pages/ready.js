import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebaseUtils';
import KitchenCard from '../components/kitchencard';
import NavKitchen from '../components/navkitchen';

export default function Ready() {
  
  const [ready, setReady] = useState([]);

  useEffect(() => {
    firebase.firestore().collection('orders')
      .where('status', '==', 'Pronto')      
      .onSnapshot((snap) => {
        const history = snap.docs.map((item) => ({
          id: item.id,
          ...item.data()
        }))        
        setReady(history);
      })
  }, []);

  const changeStatus = (item) => {  
    const time2 = new Date(item.time2.toDate().toLocaleString('pt-BR'));
    const time1 = new Date(item.time1.toDate().toLocaleString('pt-BR'));
    const difftime = Math.round(((time2.getTime() - time1.getTime()) / 1000) / 60);   

    firebase.firestore().collection('orders').doc(item.id).update({
      status: 'Entregue',
      difftime: difftime,
    })           
  };

  return (
    <div>      
      <NavKitchen />
      <KitchenCard status={ready} onClick={changeStatus} title={'Entregue'}/>      
    </div>
  )
};
