'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CardIcon from '@mui/icons-material/CreditCardRounded';
import CashIcon from '@mui/icons-material/LocalAtmRounded';

import { PaymentMethod } from '@/libs/enum';
import { getCardByUser } from '@/libs/query';
import { getStoredValue } from '@/libs/utils';

interface SelectMethodDialogProps {
  open: boolean;
  selectedValue: PaymentMethod;
  onClose: (value: PaymentMethod) => void;
}
export default function SelectMethodDialog(props: SelectMethodDialogProps) {
  const { onClose, selectedValue, open } = props;
  const userId = getStoredValue('user_id');
  const { data, status } = useQuery({
    queryKey: ['card', userId],
    queryFn: getCardByUser,
  });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    if (value === 'cash' || !value) {
      onClose(value as PaymentMethod);
    } else if (value === 'card') onClose(value as PaymentMethod);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
      <List>
        <ListItem>
          <ListItemButton onClick={() => handleListItemClick('cash')} selected={selectedValue === 'cash'}>
            <ListItemIcon>
              <CashIcon />
            </ListItemIcon>
            <ListItemText primary='Tiền mặt' />
          </ListItemButton>
        </ListItem>
        {status === 'success' && data && (
          <ListItem>
            <ListItemButton onClick={() => handleListItemClick('card')} selected={selectedValue === 'card'}>
              <ListItemIcon>
                <CardIcon />
              </ListItemIcon>
              <ListItemText primary='Thẻ' secondary={data.bankName} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}
