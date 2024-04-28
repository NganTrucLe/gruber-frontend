'use client';
import { styled } from '@mui/material/styles';

export const Main = styled('main')(({ theme }) => ({
  padding: '0 1rem',
  width: '80%',
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export const ScrollContainer = styled('div')({
  overflowX: 'scroll',
  marginRight: '-1rem',
  marginLeft: '-1rem',
  padding: '0 1rem',
});
