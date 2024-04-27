'use client';
import React, { useEffect, useState } from 'react';
import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';

import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';

import PhoneIcon from '@mui/icons-material/LocalPhoneRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation } from '@/hooks';
import { price } from '@/libs/utils';
import { colors, Directions } from '@/libs/ui';
import SuccessfulDialog from './SuccessfulDialog';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_NAME_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ID = process.env.NEXT_PUBLIC_NAME_GOOGLE_MAPS_ID;

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
  const position = useCurrentLocation();
  const [toPickup] = useState(true);
  const [succeed, setSucceed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setSucceed(false);
    }, 5000);
  });

  // TODO: Replace with data fetch from the server
  const booking = {
    customer: {
      name: 'Nguyễn Văn A',
      phone: '0123456789',
      rating: 4.5,
    },
    pickup: {
      geometry: {
        location: {
          lat: 10.762622,
          lng: 106.660172,
        },
      },
      name: 'Nhà thuốc tây Thiên Phượng',
      formatted_address: '123 Nguyễn Thị Minh Khai, Hồ Chí Minh',
    },
    destination: {
      geometry: {
        location: {
          lat: 10.762622,
          lng: 106.640172,
        },
      },
      name: '123 Nguyễn Thị Minh Khai, Hồ Chí Minh',
      formatted_address: '123 Nguyễn Thị Minh Khai, Hồ Chí Minh',
    },
    price: 50000,
    paymentMethod: 'cash',
  };

  return (
    <Main>
      {GOOGLE_MAPS_API_KEY === undefined ? (
        <Typography variant='h6'>Không thể tải map</Typography>
      ) : (
        <MapContainer apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={position}
            defaultZoom={15}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={GOOGLE_MAPS_ID}>
            <AdvancedMarker position={position} title={'Vị trí của tôi'}>
              <MyLocationIcon fontSize='large' sx={{ color: 'blue' }} color='primary' />
            </AdvancedMarker>
            <AdvancedMarker position={booking.pickup.geometry.location} title={'Điểm đón'}>
              <Pin background={colors.green[500]} glyphColor='white' borderColor={colors.green[600]} scale={1.5}>
                <Typography variant='h6'>1</Typography>
              </Pin>
            </AdvancedMarker>
            <AdvancedMarker position={booking.destination.geometry.location} title={'Điểm trả'}>
              <Pin
                background={colors.notification.error}
                glyphColor='white'
                borderColor={colors.notification.error}
                scale={1.5}>
                <Typography variant='h6'>2</Typography>
              </Pin>
            </AdvancedMarker>
            <Directions origin={position} destination={booking.pickup.geometry.location} />
            <Directions
              origin={booking.pickup.geometry.location}
              destination={booking.destination.geometry.location}
              mainDirection
            />
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
              <Typography variant='body1'>{booking.customer.name}</Typography>
              <Typography variant='h6'>
                <b>{booking.pickup.name}</b>: {booking.pickup.formatted_address}
              </Typography>
              <Typography variant='body1'>
                {price(booking.price)} &ensp; {booking.paymentMethod == 'cash' ? 'Tiền mặt' : 'Thẻ ngân hàng'}
              </Typography>
            </div>
            <Divider />
            <Stack sx={{ width: '100%' }}>
              <Stack direction='row' spacing={2}>
                {/* TODO: Calculate the distance between current location and the marker, 
                    then change the color, variant state, as well as the content */}
                <Button size='large' sx={{ flexGrow: 1 }} variant='outlined'>
                  Đã đến
                </Button>
                <Fab size='medium' sx={{ boxShadow: 0 }} color='primary'>
                  <PhoneIcon />
                </Fab>
              </Stack>
            </Stack>
          </Paper>
          <SuccessfulDialog
            props={{
              open: succeed,
              onClose: () => {},
            }}
            booking={booking}
          />
        </MapContainer>
      )}
    </Main>
  );
}
