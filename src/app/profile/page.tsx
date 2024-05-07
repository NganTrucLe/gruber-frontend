'use client';
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

import { colors, Main, Navigation, TopAppBar } from '@/libs/ui';
import { roleState } from '@/recoils';

export default function ProfilePage() {
  const [role] = useRecoilState(roleState);

  return (
    <Main>
      {role == 'user' ? <Navigation /> : <TopAppBar title='Tài khoản' backHref='/home' />}
      <Paper
        sx={{ bgcolor: colors.green[800], p: 2, mb: 2, ml: '-1rem', mr: '-1rem' }}
        component={Stack}
        direction='row'
        alignItems='center'
        justifyContent='space-between'>
        <div>
          <Typography variant='h6' fontWeight='bold' color='white'>
            Nhật Minh
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
        <ListItemButton>
          <ListItemText>Thông tin tài xế</ListItemText>
          <ChevronRightIcon sx={{ color: 'text.secondary' }} />
        </ListItemButton>
        <Divider />
        <ListItemButton>
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
        <ListItemButton component={Link} href='/income'>
          <ListItemText>Thu nhập của tôi</ListItemText>
          <ChevronRightIcon sx={{ color: 'text.secondary' }} />
        </ListItemButton>
        <Divider />
        <ListItemButton component={Link} href='/wallet'>
          <ListItemText>Quản lý ví</ListItemText>
          <ChevronRightIcon sx={{ color: 'text.secondary' }} />
        </ListItemButton>
      </List>
      <ListItemButton>
        <ListItemText primaryTypographyProps={{ color: 'error' }}>Đăng xuất</ListItemText>
      </ListItemButton>
    </Main>
  );
}
