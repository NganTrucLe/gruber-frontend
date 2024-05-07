// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCxqt523osk4OdUuFaGvj_aWXNsJ4WmpCI',
  authDomain: 'gruber-10230.firebaseapp.com',
  databaseURL: 'https://gruber-10230-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'gruber-10230',
  storageBucket: 'gruber-10230.appspot.com',
  messagingSenderId: '350050012871',
  appId: '1:350050012871:web:39e58314bade15956c78e2',
  measurementId: 'G-S0R1KGL0TV',
});
// eslint-disable-next-line no-unused-vars
const _messaging = firebase.messaging();
