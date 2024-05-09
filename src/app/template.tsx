'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import { useLocalStorage } from '@/hooks';
import { roleState } from '@/recoils';
import { verifyToken } from '@/libs/query';
import { useMutation } from '@tanstack/react-query';
import { RoleType } from '@/libs/enum';

export default function Template({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const localStorage = useLocalStorage();
  const [role, setRole] = useRecoilState(roleState);
  const { mutate, isPending } = useMutation({
    mutationFn: verifyToken,
    onError: (error) => {
      console.error(error);
      localStorage.removeStoredValue('idToken');
      localStorage.removeStoredValue('user_id');
      router.push('/welcome');
    },
    onSuccess: (role) => {
      setRole(role as RoleType);
    },
  });

  useEffect(() => {
    const token = localStorage.getStoredValue('idToken');
    mutate(token);
  }, []);

  if (isPending) return <div>Loading...</div>;
  if (role) return children;
  else return null;
}
