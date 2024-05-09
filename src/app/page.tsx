'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useRecoilState } from 'recoil';

import { styled } from '@mui/material/styles';

import { Navigation } from '@/libs/ui';
import { roleState } from '@/recoils';

const HomePassenger = dynamic(() => import('./_components').then((mod) => mod.HomePassenger), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const HomeAdmin = dynamic(() => import('./_components').then((mod) => mod.HomeAdmin), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const HomeDriver = dynamic(() => import('./_components').then((mod) => mod.HomeDriver), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const HomeStaff = dynamic(() => import('./_components').then((mod) => mod.HomeStaff), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

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

export default function Home() {
  const [role] = useRecoilState(roleState);

  switch (role) {
    case 'passenger':
      return (
        <>
          <HomePassenger />
          <Navigation />
        </>
      );
    case 'driver':
      return <HomeDriver />;
    case 'admin':
      return <HomeAdmin />;
    case 'staff':
      return <HomeStaff />;
    default:
      return <Main />;
  }
}
