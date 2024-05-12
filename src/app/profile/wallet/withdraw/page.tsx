'use client';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { colors, Main, TopAppBar, TransactionCard, LoadingButton } from '@/libs/ui';
import { getStoredValue } from '@/libs/utils';
import { useToast } from '@/hooks';
import { getWalletsByDriverId, getCardByUser, withdraw } from '@/libs/query';
import { WalletState } from '../atom';
import { WalletType } from '@/libs/enum';

const StyledInput = styled(Input)({
  fontSize: '32px',
  fontWeight: 700,
  '& .MuiInput-input': {
    textAlign: 'center',
  },
  '::before': {
    borderBottom: `3px solid ${colors.green[100]}`,
  },
  ':hover:not(.Mui-disabled, .Mui-error):before': {
    borderBottom: `3px solid ${colors.green[500]}`,
  },
});

const Chips = styled('div')({
  width: '100%',
  overflowX: 'scroll',
  marginRight: '-1rem',
  marginLeft: '-1rem',
});

export default function WithdrawPage() {
  const userId = getStoredValue('user_id');
  const walletState = useRecoilValue(WalletState);
  const { setToast } = useToast();
  const [inputValue, setInputValue] = useState(0);
  const options = [200000, 500000, 1000000, 2000000];
  const queryClient = useQueryClient();
  const { data: wallet, status: walletStatus } = useQuery({
    queryKey: ['wallets'],
    queryFn: getWalletsByDriverId,
  });
  const { data: card, status: cardStatus } = useQuery({
    queryKey: ['card', userId],
    queryFn: getCardByUser,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: () => withdraw(walletState, inputValue),
    onSuccess: (data) => {
      queryClient.setQueryData(['wallets'], data);
      setToast('success', 'Rút tiền thành công');
    },
    onError: (error) => {
      setToast('error', error.message);
    },
  });

  function formatPrice(value: number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }

  const handleWithdraw = () => {
    if (inputValue > (walletState == WalletType.CASH ? wallet?.cashWallet?.amount : wallet?.creditWallet?.amount)) {
      setToast('error', 'Số dư không đủ');
    } else mutate();
  };

  return (
    <Main>
      <TopAppBar title='Chuyển khoản' backHref='/profile/wallet' />
      {walletStatus == 'pending' ? (
        <CircularProgress />
      ) : (
        <>
          <Stack direction='row' alignItems={'center'} sx={{ mb: 2 }}>
            <TransactionCard
              variant='send'
              primary={walletState == WalletType.CASH ? 'Ví tiền mặt' : 'Ví tín dụng'}
              secondary={formatPrice(inputValue)}
            />
            <LinearProgress color='success' sx={{ flexGrow: 1 }} />
            {cardStatus !== 'success' || card == null ? (
              <CircularProgress />
            ) : (
              <TransactionCard variant='receive' primary={card.bankName} secondary={card.cardAccountName} />
            )}
          </Stack>
          <Stack alignItems={'center'} sx={{ width: '100%' }}>
            <Typography>
              Số dư&ensp;{walletState == WalletType.CASH ? 'Ví tiền mặt' : 'Ví tín dụng'}:{' '}
              <b>
                {formatPrice(walletState == WalletType.CASH ? wallet.cashWallet.amount : wallet.creditWallet.amount)}
              </b>
            </Typography>
            <StyledInput
              type='number'
              placeholder={formatPrice(0)}
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              sx={{
                my: 4,
                width: {
                  xs: '100%',
                  sm: '20rem',
                },
              }}
              autoFocus
            />
            <Chips>
              <Stack direction='row' mb={2} spacing={1} justifyContent={'center'}>
                {options.map((option) => (
                  <Chip key={option} label={formatPrice(option)} onClick={() => setInputValue(option)} />
                ))}
              </Stack>
            </Chips>
            <LoadingButton
              sx={{
                width: {
                  xs: '100%',
                  sm: '20rem',
                },
              }}
              loading={isPending}
              onClick={handleWithdraw}>
              Xác nhận
            </LoadingButton>
          </Stack>
        </>
      )}
    </Main>
  );
}
