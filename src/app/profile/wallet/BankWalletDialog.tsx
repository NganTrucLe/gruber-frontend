'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import { Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, Stack } from '@mui/material';

import { formatPrice } from '@/libs/utils';
import { WalletState } from './atom';
import { WalletType } from '@/libs/enum';

export default function BankWalletDialog(props: DialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setWalletState = useSetRecoilState(WalletState);

  return (
    <Dialog {...props} fullWidth maxWidth='sm'>
      <DialogTitle>Ví tín dụng </DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom color='text.primary' fontWeight='bold' variant='h3' textAlign={'center'}>
          {formatPrice(
            (queryClient.getQueryData(['wallets']) as { creditWallet: { amount: number } })?.creditWallet?.amount || 0
          )}
        </DialogContentText>
        <DialogContentText>
          Ví tín dụng hoạt động như một <b>hình thức đặt cọc</b> của tài xế dành cho đơn vị Gruber. Các cuốc xe thanh
          toán bằng tiền mặt tài xế nhận được sẽ bị trừ số dư ngược lại vào ví này.
        </DialogContentText>
        <DialogContentText>
          Nếu ví tín dụng không đủ, bạn sẽ <b>không thể</b> nhận các cuốc xe thanh toán bằng tiền mặt lớn hơn số dư này.
        </DialogContentText>
        <Stack direction='row' spacing={2} sx={{ mt: 4 }}>
          <Button
            fullWidth
            size='large'
            variant='secondary'
            onClick={() => {
              setWalletState(WalletType.CREDIT);
              router.push('/profile/wallet/withdraw');
            }}>
            Rút tiền
          </Button>
          <Button fullWidth size='large' component={Link} href='/profile/wallet/deposit'>
            Nạp thêm tiền
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
