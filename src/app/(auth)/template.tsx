'use client';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

import { styled } from '@mui/material/styles';

import { useLocalStorage } from '@/hooks';

const Main = styled('main')(({ theme }) => ({
  padding: '1rem',
  position: 'absolute',
  width: '100%',
  maxWidth: '31.25rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& > *': {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    position: 'fixed',
    maxWidth: '100vw',
  },
}));

export default function AuthTemplate({ children }: { children: ReactNode }) {
  const localStorage = useLocalStorage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getStoredValue('idToken') && pathname !== '/log-in' && pathname !== '/sign-up') {
      router.push('/');
    }
  }, []);

  return (
    <Main>
      <Image src='/Gruber.svg' alt='logo' width={250} height={200} />
      {children}
    </Main>
  );
}
