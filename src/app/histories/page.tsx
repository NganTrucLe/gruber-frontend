'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import TimeToLeaveRoundedIcon from '@mui/icons-material/TimeToLeaveRounded';
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded';

import { getBookingHistory } from '@/libs/query';
import { TopAppBar } from '@/libs/ui';
import { formatPrice, shortenAddress } from '@/libs/utils';

const Main = styled('main')(({ theme }) => ({
  padding: theme.spacing(2),
  width: '80%',
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

export default function HistoryPage() {
  const { data, status } = useQuery({
    queryKey: ['histories'],
    queryFn: getBookingHistory,
    initialData: [],
  });
  if (status === 'error') {
    return <Typography variant='h6'>Đã có lỗi xảy ra</Typography>;
  }
  if (status === 'success' && data) {
    return (
      <Main>
        <TopAppBar title='Lịch sử' backHref='/' />
        <List>
          {data.map((history) => {
            const { booking_route, finished_on, price, vehicle_type } = history;
            return (
              <ListItem key={history.id} disablePadding divider>
                <ListItemButton sx={{ px: 0 }} component={Link} href={`/histories/${history.id}`}>
                  <ListItemAvatar>
                    <Avatar>
                      {vehicle_type === 'motorbike' ? <TwoWheelerRoundedIcon /> : <TimeToLeaveRoundedIcon />}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ pr: 1 }}
                    primary={`${shortenAddress(booking_route.pick_up.formatted_address)} - ${shortenAddress(booking_route.destination.formatted_address)}`}
                    secondary={
                      <Typography variant='caption'>{format(new Date(finished_on), 'dd/MM/yyyy - HH:mm')}</Typography>
                    }
                  />
                  <ListItemText primary={formatPrice(price)} sx={{ textAlign: 'right' }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Main>
    );
  }
  return null;
}
