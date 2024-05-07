'use client';
import { useEffect } from 'react';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
    height: 'fit-content',
    top: 'auto',
    left: '0',
    right: '0',
    transform: 'none',
    bottom: 0,
    borderRadius: '1rem 1rem 0 0',
    maxWidth: '100vh',
  },
}));
export default function AuthLayout({ children }: { children: ReactNode }) {
  const localStorage = useLocalStorage('idToken');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getStoredValue()) {
      router.push('/home');
    }
  }, []);

  return <Main>{children}</Main>;
}
