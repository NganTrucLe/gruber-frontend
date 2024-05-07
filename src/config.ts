// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCxqt523osk4OdUuFaGvj_aWXNsJ4WmpCI',
  authDomain: 'gruber-10230.firebaseapp.com',
  databaseURL: 'https://gruber-10230-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'gruber-10230',
  storageBucket: 'gruber-10230.appspot.com',
  messagingSenderId: '350050012871',
  appId: '1:350050012871:web:39e58314bade15956c78e2',
  measurementId: 'G-S0R1KGL0TV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const requestPermission = () => {
  const messaging = getMessaging(app);
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, {
        vapidKey: 'BCTJaRh8TFKegRAzTaSU6ceYLyRyi59dwp30l5D1LVmlYrCZYkHSYj1zey7G7PoUsqPZYVrPwnDZBVuTvev6fSA',
      })
        .then((currentToken) => {
          if (currentToken) {
            /* eslint-disable no-console */
            console.log('FCM Token: ', currentToken);
            // Send the token to your server and update the UI if necessary
          } else {
            /* eslint-disable no-console */
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          /* eslint-disable no-console */
          console.log('An error occurred while retrieving token. ', err);
        });
    }
  });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging(app);
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
