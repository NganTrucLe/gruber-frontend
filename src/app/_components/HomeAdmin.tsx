'use client';
import Link from 'next/link';
import { BarChart } from '@mui/x-charts/BarChart';

import { Avatar, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import ChartIcon from '@mui/icons-material/BarChartRounded';
import DriverIcon from '@mui/icons-material/GroupsRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import TaxiIcon from '@mui/icons-material/LocalTaxiRounded';

import { colors } from '@/libs/ui';
import CustomPieChart from './PieChart';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

const options = [
  { icon: <HomeIcon color='primary' />, label: 'Trang chủ' },
  { icon: <ChartIcon color='primary' />, label: 'Thống kê' },
  { icon: <DriverIcon color='primary' />, label: 'Quản lý tài xế' },
  { icon: <TaxiIcon color='primary' />, label: 'Quản lý cuốc xe' },
];

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
      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
        <Typography variant='h4' fontWeight='bold'>
          Cổng quản lý &emsp;
        </Typography>
        <Avatar component={Link} href='/profile' />
      </Stack>
      <Stack direction='row' justifyContent='center' flexWrap='wrap' sx={{ width: '100%' }}>
        {options.map((option, index) => (
          <Card key={index} sx={{ width: '8rem' }}>
            <CardActionArea>
              <CardContent component={Stack} alignItems='center'>
                <Avatar
                  sx={{
                    width: '3rem',
                    height: '3rem',
                    bgcolor: colors.green[50],
                    mb: 1,
                  }}>
                  {option.icon}
                </Avatar>
                <Typography textAlign='center'>{option.label}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>

      <ChartsOverviewDemo />
      <CustomPieChart />
    </Main>
  );
}
