'use client';
import Link from 'next/link';

import { Avatar, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import ChartIcon from '@mui/icons-material/BarChartRounded';
import DriverIcon from '@mui/icons-material/GroupsRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import TaxiIcon from '@mui/icons-material/LocalTaxiRounded';

import { colors } from '@/libs/ui';
import CurrentRides from './CurrentRides';

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

export default function HomePage() {
  return (
    <Main>
      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
        <Stack direction='row' alignItems='center'>
          <Typography variant='h4' fontWeight='bold'>
            Cổng quản lý &emsp;
          </Typography>
          <Button sx={{ ml: 2 }} component={Link} href='/create-ride'>
            Tạo cuốc xe mới
          </Button>
        </Stack>
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
      <section>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Các cuốc xe hiện tại
        </Typography>
        <CurrentRides />
      </section>
      {/* <section>
        <Typography variant='h6' fontWeight='bold'>
          Các tài xế online
        </Typography>
        <SupportTable headCells={headCells} state='empty' />
      </section> */}
    </Main>
  );
}
