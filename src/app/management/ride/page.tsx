'use client';
import { styled } from '@mui/material/styles';

import { Typography } from '@mui/material';

import { AdminNavbar } from '@/app/_components/AdminNavbar';
import AllRides from './AllRides';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

export default function RideManagement() {
  return (
    <Main>
      <AdminNavbar />
      <section>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Danh sách các cuốc xe
        </Typography>
        <AllRides />
      </section>
    </Main>
  );
}
