'use client';
import React from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
  return (
    <Main>
      <Link href='/welcome'>
        <Button sx={{ width: '100%' }}>Đăng ký, đăng nhập</Button>
      </Link>
      <Link href='/home'>
        <Button sx={{ width: '100%' }}>Đặt xe</Button>
      </Link>
    </Main>
  );
}
