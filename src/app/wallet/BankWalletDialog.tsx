'use client';
import Link from 'next/link';

import { Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, Stack } from '@mui/material';

import { price } from '@/libs/utils';

export default function BankWalletDialog(props: DialogProps) {
  return (
    <Dialog {...props} fullWidth maxWidth='sm'>
      <DialogTitle>Ví tín dụng </DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom color='text.primary' fontWeight='bold' variant='h3' textAlign={'center'}>
          {price(500000)}
        </DialogContentText>
        <DialogContentText>
          Ví tín dụng hoạt động như một <b>hình thức đặt cọc</b> của tài xế dành cho đơn vị Gruber. Các cuốc xe thanh
          toán bằng tiền mặt tài xế nhận được sẽ bị trừ số dư ngược lại vào ví này.
        </DialogContentText>
        <DialogContentText>
          Nếu ví tín dụng không đủ, bạn sẽ <b>không thể</b> nhận các cuốc xe thanh toán bằng tiền mặt lớn hơn số dư này.
        </DialogContentText>
        <Stack direction='row' spacing={2} sx={{ mt: 4 }}>
          <Button component={Link} fullWidth size='large' variant='secondary' href='/wallet/withdraw'>
            Rút tiền
          </Button>
          <Button component={Link} fullWidth size='large' href='/wallet/deposit'>
            Nạp thêm tiền
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
