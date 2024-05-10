'use client';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { colors, Main, TopAppBar, TransactionCard, LoadingButton } from '@/libs/ui';
import { useToast } from '@/hooks';
import { getStoredValue } from '@/libs/utils';
import { deposit, getCardByUser, getWalletsByDriverId } from '@/libs/query';

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
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState(0);
  const { setToast } = useToast();
  const options = [200000, 500000, 1000000, 2000000];
  const { data: wallet, status: walletStatus } = useQuery({
    queryKey: ['wallets'],
    queryFn: getWalletsByDriverId,
  });
  const { data: card, status: cardStatus } = useQuery({
    queryKey: ['card', userId],
    queryFn: getCardByUser,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: () => deposit(inputValue),
    onSuccess: (data) => {
      queryClient.setQueryData(['wallets'], data);
      setToast('success', 'Nạp tiền thành công');
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

  return (
    <Main>
      <TopAppBar title='Nạp tiền' backHref='/profile/wallet' />
      {walletStatus == 'pending' ? (
        <CircularProgress />
      ) : (
        <>
          <Stack direction='row' alignItems={'center'} sx={{ mb: 2 }}>
            {cardStatus !== 'success' || card == null ? (
              <CircularProgress />
            ) : (
              <TransactionCard variant='receive' primary={card.bankName} secondary={card.cardAccountName} />
            )}
            <LinearProgress color='success' sx={{ flexGrow: 1 }} />
            <TransactionCard
              variant='receive'
              primary='Ví tín dụng'
              secondary={formatPrice(wallet.creditWallet.amount)}
            />
          </Stack>
          <Stack alignItems={'center'} sx={{ width: '100%' }}>
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
              onClick={() => mutate()}>
              Xác nhận
            </LoadingButton>
          </Stack>
        </>
      )}
    </Main>
  );
}
