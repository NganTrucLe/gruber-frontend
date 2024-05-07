'use client';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { getBookingById, updateRating } from '@/libs/query';
import { Marker, TopAppBar } from '@/libs/ui';
import { formatPrice } from '@/libs/utils';

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

export default function HistoryDetailPage({ params }: { params: { id: string } }) {
  const [isRate, setIsRate] = useState(false);
  const { data, status } = useQuery({
    queryKey: ['histories', params.id],
    queryFn: () => getBookingById(params.id),
  });

  const { mutate } = useMutation({
    mutationFn: (rating: number) => updateRating(params.id, rating),
    onSuccess: () => {
      alert('Cảm ơn bạn đã đánh giá');
      setIsRate(true);
    },
  });

  useEffect(() => {
    if (data && data.driver_rating) {
      setIsRate(true);
    }
  }, [data]);

  const { apiKey, mapId } = useGoogleMapAPI();

  if (status === 'pending') {
    return <Typography variant='h6'>Đang tải...</Typography>;
  }

  if (status === 'error') {
    return <Typography variant='h6'>Đã có lỗi xảy ra</Typography>;
  }

  if (status === 'success' && data) {
    const { id, booking_route, driver, finished_on, driver_rating, payment_method, vehicle_type, price } = data;
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
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar src={driver.avatar} />
              <Typography variant='body1'>{driver.name}</Typography>
            </Stack>
            {driver_rating || isRate ? (
              <Rating size='large' value={driver_rating} readOnly />
            ) : new Date(finished_on).getTime() + 72 * 60 * 60 * 1000 < new Date().getTime() ? (
              <Typography variant='caption' color='gray'>
                Bạn không thể đánh giá hoặc cho tiền tip cho chuyến đi này sau 72 giờ
              </Typography>
            ) : (
              <Rating
                size='large'
                onChange={(_e, value) => {
                  if (value !== null) mutate(value);
                }}
              />
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
                <Map
                  defaultZoom={15}
                  defaultCenter={booking_route.pick_up.location}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  mapId={mapId}></Map>
                <Marker position={booking_route.pick_up.location} type='pickup' role='passenger' />
                <Marker position={booking_route.destination.location} type='destination' role='passenger' />
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
                {booking_route.destination.formatted_address}
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
  return null;
}
