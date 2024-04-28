import { useRouter } from 'next/navigation';

import Backdrop, { BackdropProps } from '@mui/material/Backdrop';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';

import { price } from '@/libs/utils';

export default function IncomeOptions(props: BackdropProps) {
  const router = useRouter();
  // TODO: Replace with data fetch from the server
  const wallet = {
    income: 100000,
    balance: 50000,
  };

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, alignItems: 'flex-start' }} {...props}>
      <Stack
        spacing={2}
        sx={{
          pt: '2rem',
          width: {
            xs: 'calc(100vw - 2rem)',
            sm: '80%',
            md: '50%',
          },
        }}
        alignItems='flex-start'>
        <Fab sx={{ bgColor: 'white', boxShadow: 0 }} size='medium' onClick={(e) => props.onClick && props.onClick(e)}>
          <CloseRounded />
        </Fab>
        <Paper
          sx={{
            p: 2,
            width: '12rem',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            router.push('/income');
          }}>
          <div>
            <Typography>Thu nhập</Typography>
            <Typography variant='h5' fontWeight='bold'>
              {price(wallet.income)}
            </Typography>
          </div>
          <ChevronRightRounded />
        </Paper>
        <Paper
          sx={{
            p: 2,
            width: '12rem',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '&:hover': {
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            router.push('/wallet');
          }}>
          <div>
            <Typography>Ví</Typography>
            <Typography variant='h5' fontWeight='bold'>
              {price(wallet.balance)}
            </Typography>
          </div>
          <ChevronRightRounded />
        </Paper>
      </Stack>
    </Backdrop>
  );
}
