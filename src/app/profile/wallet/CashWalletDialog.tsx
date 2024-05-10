'use client';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import { Button, Dialog, DialogContent, DialogContentText, DialogProps, DialogTitle, Stack } from '@mui/material';

import { formatPrice } from '@/libs/utils';
import { WalletState } from './atom';
import { WalletType } from '@/libs/enum';

export default function CashWalletDialog(props: DialogProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setWalletState = useSetRecoilState(WalletState);

  return (
    <Dialog {...props} fullWidth maxWidth='sm'>
      <DialogTitle>Ví tiền mặt</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom color='text.primary' fontWeight='bold' variant='h3' textAlign={'center'}>
          {formatPrice(
            (queryClient.getQueryData(['wallets']) as { cashWallet: { amount: number } })?.cashWallet?.amount || 0
          )}
        </DialogContentText>
        <DialogContentText>Thu nhập của tài xế từ các cuốc xe được chuyển về ví này.</DialogContentText>
        <Stack direction='row' spacing={2} sx={{ mt: 4 }}>
          <Button
            fullWidth
            size='large'
            onClick={() => {
              setWalletState(WalletType.CASH);
              router.push('/profile/wallet/withdraw');
            }}>
            Rút tiền
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
