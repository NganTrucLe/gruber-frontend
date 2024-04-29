'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { format } from 'date-fns';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CashIcon from '@mui/icons-material/LocalAtmRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import histories from '@/libs/mocks/histories.json';
import { price } from '@/libs/utils';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_NAME_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ID = process.env.NEXT_PUBLIC_NAME_GOOGLE_MAPS_ID;

const Main = styled('main')(({ theme }) => ({
  padding: theme.spacing(2),
  width: '50%',
  position: 'absolute',
  top: '0',
  left: '50%',
  transform: 'translate(-50%, 0)',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
export default function HistoryDetailPage({ params }: { params: { id: number } }) {
  const booking = histories.filter((history) => history.id == params.id)[0];

  return (
    <Main>
      <Stack spacing={2}>
        <Stack>
          <Typography variant='body1' fontWeight='bold' alignSelf='center'>
            {format(new Date(booking.datetime), 'dd/MM/yyyy - HH:mm a')}
          </Typography>
          <Stack direction='row' width='100%' justifyContent='space-between'>
            <Typography variant='caption'>Mã cuốc xe</Typography>
            <Typography variant='caption'>{booking.id}</Typography>
          </Stack>
        </Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Avatar />
          {new Date(booking.datetime).getTime() + 72 * 60 * 60 * 1000 < new Date().getTime() ? (
            <Rating size='large' />
          ) : (
            <Typography variant='caption' color='gray'>
              Bạn không thể đánh giá hoặc cho tiền tip cho chuyến đi này sau 72 giờ, hoặc không thể xem chi tiết thông
              tin tài xế.
            </Typography>
          )}
        </Stack>
        <Stack justifyContent='flex-end'>
          <Stack direction='row' width='100%' justifyContent='space-between'>
            <Typography>Tổng cộng</Typography>
            <Typography>{price(booking.price)}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{ color: 'gray' }}>
            <CashIcon fontSize='small' />
            <Typography variant='caption'>Tiền mặt</Typography>
          </Stack>
        </Stack>
        <div
          style={{
            width: '100%',
            height: '200px',
          }}>
          {GOOGLE_MAPS_API_KEY === undefined ? (
            <Typography variant='h6'>Không thể tải map</Typography>
          ) : (
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
              <Map defaultZoom={15} gestureHandling={'greedy'} disableDefaultUI={true} mapId={GOOGLE_MAPS_ID}></Map>
            </APIProvider>
          )}
        </div>
        <Stack spacing={1}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='caption'>Xe máy</Typography>
            <Typography variant='caption'>24km</Typography>
          </Stack>
          <Stack direction='row' spacing={1}>
            <MyLocationIcon color='primary' fontSize='small' />
            <Typography variant='body2' fontWeight='600'>
              {booking.pickup}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1}>
            <MyLocationIcon color='error' fontSize='small' />
            <Typography variant='body2' fontWeight='600'>
              {booking.destination}
            </Typography>
          </Stack>
        </Stack>
        <Button size='large' variant='secondary'>
          Đặt lại
        </Button>
      </Stack>
    </Main>
  );
}
