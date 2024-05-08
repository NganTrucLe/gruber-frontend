'use client';
import Link from 'next/link';

import Button from '@mui/material/Button';
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

import { Main, ScrollContainer, TopAppBar } from '@/libs/ui';
import { formatPrice } from '@/libs/utils';

export default function IncomePage() {
  // TODO: Fetch data from server
  const income = {
    today: 500000,
    yesterday: 400000,
    thisWeek: 3000000,
    thisMonth: 15000000,
  };

  const incomeCards = [
    {
      title: 'hôm nay',
      income: income.today,
    },
    {
      title: 'hôm qua',
      income: income.yesterday,
    },
    {
      title: 'tuần này',
      income: income.thisWeek,
    },
    {
      title: 'tháng này',
      income: income.thisMonth,
    },
  ];

  return (
    <Main>
      <TopAppBar title='Thu nhập' backHref='/' />
      <Stack alignItems={'center'}>
        <Tabs sx={{ mb: 2, width: 'fit-content' }} value={1}>
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
      <ScrollContainer>
        <Stack direction='row' spacing={2} width='fit-content'>
          {incomeCards.map((card, index) => (
            <Card variant='outlined' sx={{ width: '13rem' }} key={index}>
              <CardContent sx={{ paddingBottom: 0, pt: 1 }}>
                <Typography gutterBottom color='text.secondary' variant='caption'>
                  Thu nhập {card.title}
                </Typography>
                <Typography variant='h5' fontWeight='bold'>
                  {formatPrice(card.income)}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button variant='text'>Xem chi tiết</Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </ScrollContainer>
      <Card variant='outlined' sx={{ mt: 2 }}>
        <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between' }} component={Link} href='/histories'>
          <CardContent>
            <Typography variant='caption' color='text.secondary'>
              Cuốc xe đã hoàn tất
            </Typography>
            <Typography variant='h5' fontWeight='bold'>
              5 cuốc xe
            </Typography>
          </CardContent>
          <CardActions>
            <ChevronRightIcon sx={{ mr: 2 }} />
          </CardActions>
        </CardActionArea>
      </Card>
    </Main>
  );
}
