'use client';
import Link from 'next/link';
import { format } from 'date-fns';

import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import histories from '@/libs/mocks/historiesAll.json';
import { formatPrice } from '@/libs/utils';

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
  return (
    <Main>
      <Typography variant='h6'>Lịch sử</Typography>
      <List>
        {histories.map((history) => {
          const { booking_route, finished_on, price } = history;
          return (
            <ListItem key={history.id} disablePadding divider>
              <ListItemButton sx={{ px: 0 }} component={Link} href={`/histories/${history.id}`}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  sx={{ pr: 1 }}
                  primary={`${booking_route.pick_up.formatted_address} - ${booking_route.destination.formatted_address}`}
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
