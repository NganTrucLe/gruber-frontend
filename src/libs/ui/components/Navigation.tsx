'use client';
import { usePathname, useRouter } from 'next/navigation';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import AccountIcon from '@mui/icons-material/AccountCircleRounded';
import HistoryIcon from '@mui/icons-material/ReceiptLongRounded';
import RideIcon from '@mui/icons-material/TwoWheelerRounded';

export function Navigation() {
  const router = useRouter();
  const path = usePathname();

  const getCurrentValue = () => {
    if (path.startsWith('/histories')) {
      return 1;
    } else if (path.startsWith('/profile')) {
      return 2;
    } else return 0;
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid lightgray' }}>
      <BottomNavigation
        showLabels
        value={getCurrentValue()}
        onChange={(_event, newValue) => {
          if (newValue === 0) {
            // Navigate to the ride page
            router.push('/home');
          } else if (newValue === 1) {
            // Navigate to the history page
            router.push('/histories');
          } else if (newValue === 2) {
            // Navigate to the account page
            router.push('/profile');
          }
        }}>
        <BottomNavigationAction label='Đặt xe' icon={<RideIcon />} />
        <BottomNavigationAction label='Lịch sử' icon={<HistoryIcon />} />
        <BottomNavigationAction label='Tài khoản' icon={<AccountIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
