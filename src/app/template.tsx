'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import { useLocalStorage } from '@/hooks';
import { roleState } from '@/recoils';

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const localStorage = useLocalStorage();
  const [role, setRole] = useRecoilState(roleState);

  useEffect(() => {
    if (!localStorage.getStoredValue('idToken')) {
      router.push('/welcome'); // replace with your actual login page
    } else {
      const localRole = localStorage.getStoredValue('role');
      setRole(localRole);
    }
  }, []);

  if (role) return children;
  else return null;
}
