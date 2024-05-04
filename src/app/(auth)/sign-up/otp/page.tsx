'use client';

import { useState } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors, Countdown, OTPInput } from '@/libs/ui';
import { hiddenEmail } from '@/libs/utils';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function OTPPage() {
  const [OTP, setOTP] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, setKey] = useState(0);
  const [ableResend, setAbleResend] = useState(false);
  // Change later with React Query
  const isLoadingSubmit = false;
  const isLoadingResend = false;

  const onChange = (value: string) => setOTP(value);
  async function handleResend() {
    // Change later with React Query
  }

  async function handleSubmit() {
    // Change later with React Query
  }

  return (
    <>
      <Typography>
        Nhập mã code 6 chữ số được gửi đến <b>{hiddenEmail('ngantruc2003@gmail.com')}</b>
      </Typography>
      <OTPInput key={key} onChange={onChange} />
      <VisuallyHiddenInput type='number' readOnly value={OTP} name='otp' />
      <Typography>
        Không nhận được mã? Gửi lại sau{' '}
        <Countdown key={key} initialSeconds={60} onComplete={() => setAbleResend(true)} />{' '}
      </Typography>
      <Stack direction='row' spacing={2}>
        <Button disabled={!ableResend} variant='text' onClick={handleResend} sx={{ padding: 0, width: '100%' }}>
          {isLoadingResend ? (
            <CircularProgress sx={{ color: 'primary.main', padding: '5px' }} />
          ) : (
            <div>Gửi lại mã</div>
          )}
        </Button>
        <Button size='large' onClick={handleSubmit} sx={{ width: '100%' }}>
          {isLoadingSubmit ? (
            <CircularProgress sx={{ color: colors.neutral.white, padding: '5px' }} />
          ) : (
            <div>Xác nhận</div>
          )}
        </Button>
      </Stack>
    </>
  );
}
