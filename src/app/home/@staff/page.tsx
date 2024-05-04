'use client';
import { SupportTable } from '@/libs/ui';
import { Card, CardActionArea, CardContent, Stack, Typography, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { colors } from '@/libs/ui';

import TaxiIcon from '@mui/icons-material/LocalTaxiRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import ChartIcon from '@mui/icons-material/BarChartRounded';
import DriverIcon from '@mui/icons-material/GroupsRounded';
import Link from 'next/link';

const Main = styled('main')(({ theme }) => ({
  margin: '0 5rem',
  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
  '& section': {
    margin: '2rem 0 0 0',
  },
}));

const headCells = [
  { key: 'status', numeric: false, disablePadding: false, label: 'Thời gian' },
  { key: 'status', numeric: false, disablePadding: false, label: 'Mã cuốc' },
  { key: 'address', numeric: false, disablePadding: false, label: 'Loại cuốc' },
  { key: 'name', numeric: false, disablePadding: false, label: 'Route' },
  { key: 'action', numeric: false, disablePadding: false, label: 'Trạng thái' },
];

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
          <Button sx={{ ml: 2 }} component={Link} href='/home/create-ride'>
            Tạo cuốc xe mới
          </Button>
        </Stack>
        <Avatar />
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
        <Typography variant='h6' fontWeight='bold'>
          Các cuốc xe hiện tại
        </Typography>
        <SupportTable headCells={headCells} state='empty' />
      </section>
      <section>
        <Typography variant='h6' fontWeight='bold'>
          Các tài xế online
        </Typography>
        <SupportTable headCells={headCells} state='empty' />
      </section>
    </Main>
  );
}