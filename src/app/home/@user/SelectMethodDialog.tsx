'use client';
import React from 'react';

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

interface SelectMethodDialogProps {
  open: boolean;
  selectedValue: PaymentMethod;
  onClose: (value: PaymentMethod) => void;
}
export default function SelectMethodDialog(props: SelectMethodDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    if (value === 'cash' || !value) {
      onClose(value as PaymentMethod);
    } else if (value === 'bank') onClose(value as PaymentMethod);
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
        <ListItem>
          <ListItemButton onClick={() => handleListItemClick('bank')} selected={selectedValue === 'bank'}>
            <ListItemIcon>
              <CardIcon />
            </ListItemIcon>
            <ListItemText primary='Thẻ' />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
