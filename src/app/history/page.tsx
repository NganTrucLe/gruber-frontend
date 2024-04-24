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

import histories from '@/libs/mocks/histories.json';

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
        {histories.map((history) => (
          <ListItem key={history.id} disablePadding divider>
            <ListItemButton sx={{ px: 0 }} component={Link} href={`/history/${history.id}`}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText
                sx={{ pr: 1 }}
                primary={`${history.pickup} - ${history.destination}`}
                secondary={
                  <Typography variant='caption'>{format(new Date(history.datetime), 'dd/MM/yyyy - HH:mm')}</Typography>
                }
              />
              <ListItemText primary={history.price} sx={{ textAlign: 'right' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Main>
  );
}