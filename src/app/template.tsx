'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useLocalStorage } from '@/hooks';

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const localStorage = useLocalStorage();
  useEffect(() => {
    if (!localStorage.getStoredValue('idToken')) {
      router.push('/log-in'); // replace with your actual login page
    }
  }, []);
  return children;
}
