'use client';
import { BarChart } from '@mui/x-charts/BarChart';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

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
  const timeData = [35.6, 44.7, 24.3, 34.4, 50.6, 60.9, 70.3]; // replace with actual data

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return `${daysOfWeek[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}`;
  }).reverse();

  return (
    <BarChart
      series={[{ data: timeData }]}
      height={500}
      width={500}
      yAxis={[{ label: 'Tổng giá trị kinh doanh (triệu)' }]}
      xAxis={[{ data: days, scaleType: 'band', label: '7 ngày gần nhất' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}

export default function HomeAdmin() {
  return (
    <Main>
      <AdminNavbar />
      <Stack spacing={2} direction='row'>
        <ChartsOverviewDemo />
        <CustomPieChart />
      </Stack>
    </Main>
  );
}
