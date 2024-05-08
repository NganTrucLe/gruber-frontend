'use client';
import { useState } from 'react';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import IncomeIcon from '@mui/icons-material/EqualizerRounded';
import WalletIcon from '@mui/icons-material/PaymentRounded';

import { Main, TopAppBar } from '@/libs/ui';
import { formatPrice } from '@/libs/utils';
import BankWalletDialog from './BankWalletDialog';
import CashWalletDialog from './CashWalletDialog';

export default function WalletPage() {
  const [dialogBank, setDialogBank] = useState(false);
  const [dialogCash, setDialogCash] = useState(false);

  // TODO: Fetch data from server
  return (
    <Main>
      <TopAppBar title='Ví' backHref='/' />
      <Stack alignItems={'center'}>
        <Tabs sx={{ mb: 2, width: 'fit-content' }} value={2}>
          <Tab
            label='Thu nhập'
            value={1}
            icon={<IncomeIcon />}
            sx={{ width: '10rem' }}
            LinkComponent={Link}
            href='/income'
          />
          <Tab label='Ví' value={2} icon={<WalletIcon />} sx={{ width: '10rem' }} LinkComponent={Link} href='/wallet' />
        </Tabs>
      </Stack>
      <Card variant='outlined' sx={{ mt: 2 }}>
        <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => setDialogBank(true)}>
          <CardContent>
            <Typography variant='caption' color='text.secondary'>
              Ví tín dụng
            </Typography>
            <Typography variant='h5' fontWeight='bold'>
              {formatPrice(500000)}
            </Typography>
          </CardContent>
          <CardActions>
            <ChevronRightIcon sx={{ mr: 2 }} />
          </CardActions>
        </CardActionArea>
      </Card>
      <Card variant='outlined' sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => setDialogCash(true)}>
          <CardContent>
            <Typography variant='caption' color='text.secondary'>
              Ví tiền mặt
            </Typography>
            <Typography variant='h5' fontWeight='bold'>
              {formatPrice(500000)}
            </Typography>
          </CardContent>
          <CardActions>
            <ChevronRightIcon sx={{ mr: 2 }} />
          </CardActions>
        </CardActionArea>
      </Card>
      <BankWalletDialog open={dialogBank} onClose={() => setDialogBank(false)} />
      <CashWalletDialog open={dialogCash} onClose={() => setDialogCash(false)} />
    </Main>
  );
}
