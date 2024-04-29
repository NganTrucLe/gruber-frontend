'use client';
import Link from 'next/link';

import { Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, Stack } from '@mui/material';

import { price } from '@/libs/utils';

export default function CashWalletDialog(props: DialogProps) {
  return (
    <Dialog {...props} fullWidth maxWidth='sm'>
      <DialogTitle>Ví tiền mặt</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom color='text.primary' fontWeight='bold' variant='h3' textAlign={'center'}>
          {price(500000)}
        </DialogContentText>
        <DialogContentText>Thu nhập của tài xế từ các cuốc xe được chuyển về ví này.</DialogContentText>
        <Stack direction='row' spacing={2} sx={{ mt: 4 }}>
          <Button component={Link} fullWidth size='large' href='/wallet/withdraw'>
            Rút tiền
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
