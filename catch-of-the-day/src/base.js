import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyABARem6YV8DRlYQQRlBctLKV_7IItKXjc',
  authDomain: 'catch-of-the-day-ssmith.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-ssmith.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
