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

import { useGoogleMapAPI } from '@/hooks';
import history from '@/libs/mocks/historySingle.json';
import { formatPrice } from '@/libs/utils';
import { TopAppBar } from '@/libs/ui';

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
  const { apiKey, mapId } = useGoogleMapAPI();
  // eslint-disable-next-line no-console
  console.log(params);
  const { id, booking_route, finished_on, driver_rating, payment_method, vehicle_type, price } = history;

  return (
    <Main>
      <Stack spacing={2}>
        <TopAppBar
          title={
            <Stack alignItems='center'>
              <Typography variant='body1' fontWeight='bold' alignSelf='center'>
                {format(new Date(finished_on), 'dd/MM/yyyy - HH:mm a')}
              </Typography>
              <Typography variant='caption'>Mã cuốc xe: {id}</Typography>
            </Stack>
          }
        />
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Avatar />
          {new Date(finished_on).getTime() + 72 * 60 * 60 * 1000 < new Date().getTime() ? (
            <Rating size='large' value={driver_rating} />
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
            <Typography>{formatPrice(price)}</Typography>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='flex-end' sx={{ color: 'gray' }}>
            <CashIcon fontSize='small' />
            <Typography variant='caption'>{payment_method == 'cash' ? 'Tiền mặt' : 'Chuyển khoản'}</Typography>
          </Stack>
        </Stack>
        <div
          style={{
            width: '100%',
            height: '200px',
          }}>
          {apiKey === undefined ? (
            <Typography variant='h6'>Không thể tải map</Typography>
          ) : (
            <APIProvider apiKey={apiKey}>
              <Map defaultZoom={15} gestureHandling={'greedy'} disableDefaultUI={true} mapId={mapId}></Map>
            </APIProvider>
          )}
        </div>
        <Stack spacing={1}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='caption'>
              {vehicle_type == 'car4' ? 'Xe 4 chỗ' : vehicle_type == 'car7' ? 'Xe 7 chỗ' : 'Xe máy'}
            </Typography>
            {/* <Typography variant='caption'>24km</Typography> */}
          </Stack>
          <Stack direction='row' spacing={1}>
            <MyLocationIcon color='primary' fontSize='small' />
            <Typography variant='body2' fontWeight='600'>
              {booking_route.pick_up.formatted_address}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1}>
            <MyLocationIcon color='error' fontSize='small' />
            <Typography variant='body2' fontWeight='600'>
              {booking_route.pick_up.formatted_address}
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
