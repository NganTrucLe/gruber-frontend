'use client';
import React from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
export default function WelcomePage() {
  return (
    <Main>
      <Stack spacing={1}>
        <Typography variant='h5' fontWeight='600'>
          Lần đầu bạn đến đây?
        </Typography>
        <Typography>
          Đăng ký để trải nghiệm nhiều điều thú vị hơn với <b>Gruber</b>
        </Typography>
      </Stack>
      <Stack direction='column' spacing={2}>
        <Link href='/log-in'>
          <Button size='large' sx={{ width: '100%' }}>
            Đăng Nhập
          </Button>
        </Link>
        <Link href='/sign-up'>
          <Button size='large' variant='secondary' sx={{ width: '100%' }}>
            Đăng Ký
          </Button>
        </Link>
      </Stack>
    </Main>
  );
}
