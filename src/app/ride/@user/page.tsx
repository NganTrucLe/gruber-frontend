'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation, useGoogleMapAPI } from '@/hooks';
import { cancelRide, currentRideUser } from '@/libs/query';
import { Directions, LoadingButton, Marker } from '@/libs/ui';
import { formatPrice } from '@/libs/utils';

const Main = styled('main')({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const MapContainer = styled(APIProvider)({
  position: 'absolute',
});

export default function RidePage() {
  const router = useRouter();
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();
  const { data, status } = useQuery({
    queryKey: ['current-ride'],
    queryFn: currentRideUser,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (status == 'success') await cancelRide(data?.id);
    },
    onSuccess: () => {
      alert('Hủy chuyến thành công');
      router.push('/home');
    },
    onError: () => {
      alert('Hủy chuyến thất bại');
    },
  });

  const handleCancelRide = () => {
    mutate();
  };

  if (status === 'pending') {
    return <Typography variant='h6'>Đang tải...</Typography>;
  }
  if (status === 'error') {
    return <Typography variant='h6'>Không thể tải dữ liệu</Typography>;
  }
  if (status === 'success') {
    const { booking_route, driver, price, payment_method } = data;
    return (
      <Main>
        {apiKey === undefined ? (
          <Typography variant='h6'>Không thể tải map</Typography>
        ) : (
          <MapContainer apiKey={apiKey}>
            <Map
              defaultCenter={position}
              defaultZoom={15}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={mapId}>
              <AdvancedMarker position={position} title={'Vị trí của tôi'}>
                <MyLocationIcon fontSize='large' sx={{ color: 'blue' }} color='primary' />
              </AdvancedMarker>
              <Marker position={booking_route.pick_up.location} type='pickup' role='passenger' />
              <Marker position={booking_route.destination.location} type='destination' role='passenger' />
              <Directions
                origin={booking_route.pick_up.location}
                destination={booking_route.destination.location}
                mainDirection
              />
            </Map>
            <Paper
              sx={{
                position: 'absolute',
                bottom: 56.8,
                width: {
                  xs: '100%',
                  sm: '80%',
                  md: '50%',
                },
                border: '1px solid #ccc',
                borderRadius: '1rem 1rem 0 0',
                p: 2,
              }}
              component={Stack}
              spacing={2}>
              <Stack direction='row' spacing={2}>
                <Avatar />
                <div>
                  <Typography fontWeight='bold'>{driver.name}</Typography>
                  <Typography color='primary'>Tài xế đang đến chỗ bạn</Typography>
                </div>
              </Stack>
              <div>
                <Typography>
                  <b>Biển số: </b>
                  {driver.plate}
                </Typography>
                <Typography>
                  <b>Mô tả: </b>
                  {driver.description}
                </Typography>
              </div>
              <Divider />
              <div>
                <Typography>Điểm đón:</Typography>
                <Typography variant='h6'>{booking_route.pick_up.formatted_address}</Typography>
                <Typography>Điểm đến:</Typography>
                <Typography variant='h6'>{booking_route.destination.formatted_address}</Typography>
                <Typography variant='body1'>
                  {formatPrice(price)} &ensp; {payment_method == 'cash' ? 'Tiền mặt' : 'Thẻ ngân hàng'}
                </Typography>
              </div>
              <Divider />
              <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                <LoadingButton
                  loading={isPending}
                  size='large'
                  sx={{ flexGrow: 1 }}
                  variant='outlined'
                  onClick={handleCancelRide}>
                  Hủy chuyến
                </LoadingButton>
                <Fab size='medium' sx={{ boxShadow: 0 }} color='primary'>
                  <PhoneIcon />
                </Fab>
              </Stack>
            </Paper>
            {/* <SuccessfulDialog
              props={{
                open: succeed,
                onClose: () => {},
              }}
              booking={booking}
            /> */}
          </MapContainer>
        )}
      </Main>
    );
  }
  return null;
}
