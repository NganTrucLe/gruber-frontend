// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCJ_HTn1jHWibCj7LnCmb8KeHUgfC51eJo',
  authDomain: 'gruber-test.firebaseapp.com',
  projectId: 'gruber-test',
  storageBucket: 'gruber-test.appspot.com',
  messagingSenderId: '568068804018',
  appId: '1:568068804018:web:ff42bfb3c3bd4db999e8ab',
  measurementId: 'G-JEC6KWVSC8',
});
// eslint-disable-next-line no-unused-vars
const _messaging = firebase.messaging();
