// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const vapidKey = 'BJzddzV60ARS31tnP3wGqj_M7CEH3yR00e5xddYUrhul7pUxi7B6nENDvzrfBYVql8_pdVseGYY2bgk1GcKPjnA';

// Initialize Firebase
export const app = initializeApp({
  apiKey: 'AIzaSyCJ_HTn1jHWibCj7LnCmb8KeHUgfC51eJo',
  authDomain: 'gruber-test.firebaseapp.com',
  projectId: 'gruber-test',
  storageBucket: 'gruber-test.appspot.com',
  messagingSenderId: '568068804018',
  appId: '1:568068804018:web:ff42bfb3c3bd4db999e8ab',
  measurementId: 'G-JEC6KWVSC8',
});

export const requestPermission = () => {
  const messaging = getMessaging(app);
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, { vapidKey })
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
