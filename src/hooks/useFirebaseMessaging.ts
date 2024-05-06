'use client';
import { useEffect } from 'react';

import { onMessageListener, requestPermission } from '@/config';

const useFirebaseMessaging = (handleMessage: (payload: any) => void) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(() => {
          requestPermission();
        })
        .catch((err) => {
          console.error('Service Worker registration failed: ', err);
        });
    }

    const unsubscribe = onMessageListener().then((payload: any) => {
      handleMessage(payload); // Call the handleMessage function
    });
    return () => {
      unsubscribe.catch((err) => console.error('failed: ', err));
    };
  }, [handleMessage]); // Add handleMessage to the dependency array
};

export default useFirebaseMessaging;
