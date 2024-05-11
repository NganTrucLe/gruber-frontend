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

import { useCurrentLocation, useGoogleMapAPI, useToast } from '@/hooks';
import { BookingStatus } from '@/libs/enum';
import { currentRide, updateRideStatus } from '@/libs/query';
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
  const toast = useToast();
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();
  const { data, status } = useQuery({
    queryKey: ['current-ride'],
    queryFn: currentRide,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateRideStatus(data.id, BookingStatus.CANCELLED),
    onSuccess: () => {
      toast.setToast('success', 'Hủy chuyến thành công');
      router.push('/');
    },
    onError: (error) => {
      toast.setToast('error', 'Hủy chuyến thất bại', error.message);
    },
  });

  const getText = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return 'Đang tìm tài xế';
      case BookingStatus.ACCEPTED:
        return 'Tài xế đang đến chỗ bạn';
      case BookingStatus.ARRIVED:
        return 'Vui lòng thanh toán cho tài xế';
      default:
        return 'Đang đến địa điểm';
    }
  };

  if (status === 'pending') {
    return <Typography variant='h6'>Loading...</Typography>;
  }
  if (status === 'error') {
    router.push('/');
    return <Typography variant='h6'>Không thể tải dữ liệu</Typography>;
  }
  if (status === 'success') {
    if (data === null) {
      router.push('/');
      return <Typography variant='h6'>Bạn đang không có chuyến đi hiện tại nào</Typography>;
    }
    const { driver, price, payment_method, status, booking_route } = data;
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
              {status !== BookingStatus.PENDING ? (
                <>
                  <Stack direction='row' spacing={2}>
                    <Avatar />
                    <div>
                      <Typography fontWeight='bold'>{driver.name}</Typography>
                      <Typography color='primary'>{getText(status)}</Typography>
                    </div>
                  </Stack>
                  <div>
                    <Typography>
                      <b>Biển số: </b>
                      {driver?.plate}
                    </Typography>
                    <Typography>
                      <b>Mô tả: </b>
                      {driver?.description}
                    </Typography>
                  </div>
                </>
              ) : (
                <Typography color='primary'>{getText(status)}</Typography>
              )}
              <Divider />
              <div>
                <Typography variant='body1'>
                  Điểm đón: <b>{booking_route.pick_up.name}</b>
                </Typography>
                <Typography variant='body1' gutterBottom sx={{ color: 'text.secondary' }}>
                  {booking_route.pick_up.formatted_address}
                </Typography>
                <br />
                <Typography variant='body1'>
                  Điểm đến: <b>{booking_route.destination.name}</b>
                </Typography>
                <Typography variant='body1' gutterBottom sx={{ color: 'text.secondary' }}>
                  {booking_route.destination.formatted_address}
                </Typography>
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
                  disabled={data.status !== BookingStatus.PENDING}
                  variant={data.status == BookingStatus.PENDING ? 'outlined' : 'contained'}
                  onClick={() => mutate()}>
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
