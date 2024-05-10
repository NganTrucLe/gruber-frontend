'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Backdrop, { BackdropProps } from '@mui/material/Backdrop';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';

import { formatPrice } from '@/libs/utils';
import { getWalletsByDriverId } from '@/libs/query';
import { CircularProgress } from '@mui/material';

export default function IncomeOptions(props: BackdropProps) {
  const router = useRouter();
  const { data, status } = useQuery({
    queryKey: ['wallets'],
    queryFn: getWalletsByDriverId,
  });

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
            router.push('/profile/income');
          }}>
          <div>
            <Typography>Thu nhập</Typography>
            <Typography variant='h5' fontWeight='bold'>
              {formatPrice(500000)}
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
            router.push('/profile/wallet');
          }}>
          <div>
            <Typography>Ví</Typography>
            {status === 'success' ? (
              <Typography variant='h5' fontWeight='bold'>
                {formatPrice(data.creditWallet.amount)}
              </Typography>
            ) : (
              <CircularProgress />
            )}
          </div>
          <ChevronRightRounded />
        </Paper>
      </Stack>
    </Backdrop>
  );
}
