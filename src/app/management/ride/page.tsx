'use client';
import { styled } from '@mui/material/styles';

import { AdminNavbar } from '@/app/_components/AdminNavbar';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

export default function RideManagementPage() {
  return (
    <Main>
      <AdminNavbar />
    </Main>
  );
}
