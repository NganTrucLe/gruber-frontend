'use client';
import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import CheckIcon from '@mui/icons-material/CheckRounded';
import FilterIcon from '@mui/icons-material/FilterListRounded';

import histories from '@/libs/mocks/histories.json';
import { Main, TopAppBar } from '@/libs/ui';
import { price } from '@/libs/utils';

const options = [
  {
    display: 'Tất cả',
    value: 'all',
  },
  {
    display: 'Hôm nay',
    value: 'today',
  },
  {
    display: 'Hôm qua',
    value: 'yesterday',
  },
  {
    display: 'Tuần này',
    value: 'thisWeek',
  },
  {
    display: 'Tháng này',
    value: 'thisMonth',
  },
];

type Filter = 'all' | 'today' | 'yesterday' | 'thisWeek' | 'thisMonth';

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: Filter;
  onClose: (value: Filter) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: Filter) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Chọn bộ lọc cần thiết</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((option) => (
          <ListItem disableGutters disablePadding key={option.value}>
            <ListItemButton
              onClick={() => handleListItemClick(option.value as Filter)}
              selected={(option.value as Filter) == selectedValue}>
              <ListItemText primary={option.display} />
              {(option.value as Filter) == selectedValue ? <CheckIcon color='primary' /> : null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

function getMatchingText(value: Filter) {
  return options.filter((option) => option.value == value)[0].display;
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState(false);

  const handleClose = (value: Filter) => {
    setOpen(false);
    setFilter(value);
  };

  return (
    <Main>
      <TopAppBar title='Lịch sử' />
      <Chip
        label={getMatchingText(filter)}
        variant='outlined'
        color='primary'
        icon={<FilterIcon />}
        onClick={() => setOpen(true)}
      />
      <SimpleDialog selectedValue={filter} open={open} onClose={handleClose} />
      <List>
        {histories.map((history) => (
          <ListItem key={history.id} disablePadding divider>
            <ListItemButton
              sx={{
                px: 0,
                alignItems: 'flex-end',
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
              component={Link}
              href={`/histories/${history.id}`}>
              <ListItemText
                sx={{ pr: 1 }}
                primary={`${history.pickup} - ${history.destination}`}
                secondary={
                  <Typography variant='caption'>{format(new Date(history.datetime), 'dd/MM/yyyy - HH:mm')}</Typography>
                }
              />
              <ListItemText primary={price(history.price)} sx={{ textAlign: 'right' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Main>
  );
}
