'use client';
import React from 'react';
import { useRecoilState } from 'recoil';

import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import SuccessIcon from '@mui/icons-material/CheckCircleRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ErrorIcon from '@mui/icons-material/ErrorRounded';

import { colors } from '@/libs/ui';
import { toastState } from '@/recoils';

const progressColors = {
  success: colors.notification.success,
  error: colors.notification.error,
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction='down' />;
}

const Progress = styled('div')(({ color, theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '3px',
  width: '100%',
  backgroundColor: color,
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '100%',
    width: '0%',
    backgroundColor: theme.palette.background.paper,
    animation: 'progress 3s linear forwards',
    '@keyframes progress': {
      '100%': {
        width: '100%',
      },
    },
  },
}));

export function Toast() {
  const [toast, setToast] = useRecoilState(toastState);
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={() => setToast({ ...toast, open: false })}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={SlideTransition}>
      <Paper
        sx={{
          boxShadow:
            '0px 6px 6px -3px rgba(0,0,0,0.1), 0px 10px 14px 1px rgba(0,0,0,0.05), 0px 4px 18px 3px rgba(0,0,0,0.05)',
          padding: 2,
          width: 350,
        }}>
        <Stack direction='row' spacing={2}>
          {toast.severity === 'success' ? (
            <SuccessIcon color='success' />
          ) : toast.severity === 'error' ? (
            <ErrorIcon color='error' />
          ) : null}
          <div style={{ width: '100%' }}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              mb={Boolean(toast.message) ? 1 : 0}>
              <Typography fontWeight='bold'>{toast.title}</Typography>
              <IconButton onClick={() => setToast({ ...toast, open: false })} size='small'>
                <CloseIcon fontSize='small' />
              </IconButton>
            </Stack>
            <Typography>{toast.message}</Typography>
          </div>
        </Stack>
        <Progress color={`${progressColors[toast.severity]}`} />
      </Paper>
    </Snackbar>
  );
}
