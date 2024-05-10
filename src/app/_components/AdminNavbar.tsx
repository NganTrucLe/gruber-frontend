'use client';
import { Stack, Typography, Button, Card, CardContent, CardActionArea, Avatar } from '@mui/material';
import { LogOutDialog } from '@/libs/ui';

import DriverIcon from '@mui/icons-material/GroupsRounded';
import HomeIcon from '@mui/icons-material/HomeRounded';
import TaxiIcon from '@mui/icons-material/LocalTaxiRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';

import { colors } from '@/libs/ui';

import { useState } from 'react';
import Link from 'next/link';

const options = [
  { icon: <HomeIcon color='primary' />, label: 'Trang chủ', link: '/' },
  { icon: <DriverIcon color='primary' />, label: 'Quản lý tài xế', link: '/management/driver' },
  { icon: <TaxiIcon color='primary' />, label: 'Quản lý cuốc xe', link: '/management/ride' },
];

export function AdminNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
        <Typography variant='h4' fontWeight='bold'>
          Cổng quản lý &emsp;
        </Typography>
        <Button size='large' variant='text' color='error' onClick={() => setOpen(true)} endIcon={<LogoutIcon />}>
          Đăng xuất
        </Button>
        <LogOutDialog open={open} onClose={() => setOpen(false)} />
      </Stack>
      <Stack direction='row' justifyContent='center' flexWrap='wrap' sx={{ width: '100%' }}>
        {options.map((option, index) => (
          <Card key={index} sx={{ width: '9rem' }}>
            <CardActionArea component={Link} href={option.link}>
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
    </div>
  );
}
