'use client';
import { BarChart } from '@mui/x-charts/BarChart';

import { styled } from '@mui/material/styles';

import CustomPieChart from './PieChart';

import { AdminNavbar } from './AdminNavbar';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

function ChartsOverviewDemo() {
  return (
    <BarChart
      series={[{ data: [35, 44, 24, 34] }]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}

export default function HomeAdmin() {
  return (
    <Main>
      <AdminNavbar />
      <ChartsOverviewDemo />
      <CustomPieChart />
    </Main>
  );
}
