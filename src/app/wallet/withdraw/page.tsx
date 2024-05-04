'use client';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Main, TopAppBar, TransactionCard } from '@/libs/ui';
import { colors } from '@/libs/ui';

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
  const [inputValue, setInputValue] = useState(0);
  const options = [200000, 500000, 1000000, 2000000];
  const balance = 567000;

  function formatPrice(value: number) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  }

  // TODO: Trigger to backend
  const handleWithdraw = () => {
    if (inputValue > balance) {
      alert('Số dư không đủ');
    } else {
      alert('Rút tiền thành công');
    }
  };

  return (
    <Main>
      <TopAppBar title='Chuyển khoản' backHref='/wallet' />
      <Stack direction='row' alignItems={'center'} sx={{ mb: 2 }}>
        <TransactionCard variant='send' primary='Ví tín dụng' secondary={formatPrice(inputValue)} />
        <LinearProgress color='success' sx={{ flexGrow: 1 }} />
        <TransactionCard variant='receive' primary='ACB' secondary='18921857' />
      </Stack>
      <Stack alignItems={'center'} sx={{ width: '100%' }}>
        <Typography>
          Số dư ví tín dụng: <b>{formatPrice(balance)}</b>
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
        <Button
          sx={{
            width: {
              xs: '100%',
              sm: '20rem',
            },
          }}
          onClick={handleWithdraw}>
          Xác nhận
        </Button>
      </Stack>
    </Main>
  );
}