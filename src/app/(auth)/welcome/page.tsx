'use client';
import React from 'react';
import Link from 'next/link';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function WelcomePage() {
  return (
    <>
      <Stack spacing={1} alignItems={'center'}>
        <Typography variant='h5' fontWeight='600' textAlign='left' width={'100%'}>
          Lần đầu bạn đến đây?
        </Typography>
        <Typography textAlign='left' width='100%'>
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
    </>
  );
}
