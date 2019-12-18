import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDrj7CfJcBRm3xE7rV1pExBI4t0zsubNxY",
  authDomain: "burger-queen-56e28.firebaseapp.com",
  databaseURL: "https://burger-queen-56e28.firebaseio.com",
  projectId: "burger-queen-56e28",
  storageBucket: "burger-queen-56e28.appspot.com",
  messagingSenderId: "853382238093",
  appId: "1:853382238093:web:9ec031331d1d63692c77c4",
  measurementId: "G-1C264EH17N"
};

firebase.initializeApp(firebaseConfig);

export default firebase;