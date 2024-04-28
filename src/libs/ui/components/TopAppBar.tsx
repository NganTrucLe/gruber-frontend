'use client';
import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { IconButton, Stack, styled, Typography } from '@mui/material';

import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';

interface TopAppBarProps {
  onBackClick?: () => void;
  title: string | ReactNode;
}

const Title = styled('div')(() => ({
  marginLeft: '-40px',
}));

export function TopAppBar({ onBackClick, title }: TopAppBarProps) {
  const router = useRouter();
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <Stack
      direction='row'
      justifyContent='space-between' // Change to 'space-between'
      sx={{
        height: {
          xs: '56px',
          sm: '64px',
        },
        marginLeft: '-1rem',
        marginRight: '-1rem',
      }}
      p={2}
      alignItems={'center'}>
      <IconButton onClick={(_e) => handleBackClick()}>
        <BackIcon />
      </IconButton>
      <Title>{typeof title === 'string' ? <Typography variant='h6'>{title}</Typography> : title}</Title>
      <div />
    </Stack>
  );
}
