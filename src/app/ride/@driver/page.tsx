'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

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
import { LoadingButton } from '@/libs/ui';
import { Marker } from '@/libs/ui';
import { formatPrice } from '@/libs/utils';
import SuccessfulDialog from './SuccessfulDialog';

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

const getNextAction = (value: string): { text: string | null; status: BookingStatus | null } => {
  switch (value) {
    case BookingStatus.ACCEPTED:
      return { text: 'Đã đến đón khách', status: BookingStatus.PICKED_UP };
    case BookingStatus.PICKED_UP:
      return { text: 'Đã đón khách', status: BookingStatus.IN_PROGRESS };
    case BookingStatus.IN_PROGRESS:
      return { text: 'Đã đến điểm trả khách', status: BookingStatus.ARRIVED };
    case BookingStatus.ARRIVED:
      return { text: 'Xác nhận thanh toán', status: BookingStatus.COMPLETED };
    default:
      return { text: null, status: null };
  }
};

function NextActionButton({
  bookingId,
  status,
  onChangeStatus,
}: {
  bookingId: string;
  status: string;
  onChangeStatus: () => void;
}) {
  const toast = useToast();
  const [nextAction, setNextAction] = useState<{ text: string | null; status: BookingStatus | null }>(
    getNextAction(status)
  );
  const { mutate, isPending } = useMutation({
    mutationFn: (targetStatus: BookingStatus) => updateRideStatus(bookingId, targetStatus),
    onSuccess: () => {
      toast.setToast('success', 'Đã gửi thông báo đến khách');
      onChangeStatus();
      if (nextAction.status) setNextAction(getNextAction(nextAction.status));
    },
    onError: (error) => {
      toast.setToast('error', 'Không thành công', error.message);
    },
  });

  return (
    <LoadingButton
      size='large'
      sx={{ flexGrow: 1 }}
      variant='outlined'
      loading={isPending}
      onClick={() => {
        if (nextAction.status) mutate(nextAction.status);
      }}>
      {nextAction.text}
    </LoadingButton>
  );
}

export default function RidePage() {
  const position = useCurrentLocation();
  const router = useRouter();
  const { apiKey, mapId } = useGoogleMapAPI();
  const [toPickup] = useState(true);
  const {
    data: booking,
    status,
    refetch,
  } = useQuery({
    queryKey: ['current-ride'],
    queryFn: currentRide,
  });

  if (status == 'pending') {
    return <p>Loading...</p>;
  } else if (status == 'error') {
    router.push('/');
  } else if (status == 'success' && booking) {
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
              <Marker position={booking.booking_route.pick_up.location} type='pickup' role='driver' />
              <Marker position={booking.booking_route.destination.location} type='destination' role='driver' />
              {/* <Directions origin={position} destination={booking.booking_route.pick_up.coordinate} />
              <Directions
                origin={booking.pickup.geometry.location}
                destination={booking.destination.geometry.location}
                mainDirection
              /> */}
            </Map>
            <Paper
              sx={{
                position: 'absolute',
                bottom: 0,
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
              <div>
                {/* TODO: Calculate the distance between current location and the marker, then change the state */}
                {toPickup ? (
                  <Typography color='primary' textAlign='center'>
                    1 - Điểm đón khách
                  </Typography>
                ) : (
                  <Typography color='error' textAlign='center'>
                    2 - Điểm trả khách
                  </Typography>
                )}
                <Typography textAlign='center'>GrabBike</Typography>
              </div>
              <Divider />
              <div>
                <Typography variant='body1'>{booking.name}</Typography>
                <Typography variant='body1'>{booking.phone}</Typography>
                <Typography variant='h6'>
                  <b>{booking.booking_route.pick_up.name}</b>: {booking.booking_route.pick_up.formatted_address}
                </Typography>
                <Typography variant='body1'>
                  {formatPrice(booking.price)} &ensp; {booking.payment_method == 'cash' ? 'Tiền mặt' : 'Thẻ ngân hàng'}
                </Typography>
              </div>
              <Divider />
              <Stack sx={{ width: '100%' }}>
                <Stack direction='row' spacing={2}>
                  {/* TODO: Calculate the distance between current location and the marker, 
                      then change the color, variant state, as well as the content */}

                  <NextActionButton bookingId={booking.id} status={booking.status} onChangeStatus={() => refetch()} />
                  <Fab size='medium' sx={{ boxShadow: 0 }} color='primary'>
                    <PhoneIcon />
                  </Fab>
                </Stack>
              </Stack>
            </Paper>
            <SuccessfulDialog
              props={{
                open: booking.status === BookingStatus.ARRIVED,
                onClose: () => {},
              }}
              booking={booking}
            />
          </MapContainer>
        )}
      </Main>
    );
  }
  return null;
}
