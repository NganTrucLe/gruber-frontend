'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRecoilState } from 'recoil';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';

import { colors, Main, Navigation, TopAppBar, LogOutDialog } from '@/libs/ui';
import { roleState } from '@/recoils';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/libs/query';

export default function ProfilePage() {
  const [role] = useRecoilState(roleState);
  const [logOutDialog, setLogOutDialog] = useState(false);
  const { data: user, status } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (status === 'pending') {
    return <Main>Loading...</Main>;
  }
  if (status === 'success') {
    return (
      <Main>
        {role == 'passenger' ? <Navigation /> : <TopAppBar title='Tài khoản' backHref='/' />}
        <Paper
          sx={{ bgcolor: colors.green[800], p: 2, mb: 2, ml: '-1rem', mr: '-1rem' }}
          component={Stack}
          direction='row'
          alignItems='center'
          justifyContent='space-between'>
          <div>
            <Typography variant='h6' fontWeight='bold' color='white'>
              {user.fullName}
            </Typography>
            <Rating
              sx={{
                '& .MuiRating-iconEmpty': {
                  color: colors.green[600],
                },
              }}
            />
          </div>
          <Avatar sx={{ width: '4rem', height: '4rem' }} />
        </Paper>
        <List>
          <Typography variant='h6' gutterBottom>
            Tài khoản của tôi
          </Typography>
          <ListItemButton component={Link} href='/profile/general-info'>
            <ListItemText>Thông tin cá nhân</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} href='/profile/identity'>
            <ListItemText>Xác thực định danh</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} href='/profile/change-password'>
            <ListItemText>Đổi mật khẩu</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} href='/profile/bank-card'>
            <ListItemText>Liên kết thẻ</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
        </List>
        <List>
          <Typography variant='h6' gutterBottom>
            Quản lý cuốc xe
          </Typography>
          <ListItemButton component={Link} href='/histories'>
            <ListItemText>Lịch sử cuốc xe</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} href='/profile/income'>
            <ListItemText>Thu nhập của tôi</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} href='/profile/wallet'>
            <ListItemText>Quản lý ví</ListItemText>
            <ChevronRightIcon sx={{ color: 'text.secondary' }} />
          </ListItemButton>
        </List>
        <ListItemButton onClick={() => setLogOutDialog(true)}>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>Đăng xuất</ListItemText>
        </ListItemButton>
        <LogOutDialog open={logOutDialog} onClose={() => setLogOutDialog(false)} />
      </Main>
    );
  }
  return null;
}
