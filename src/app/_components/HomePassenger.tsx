'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import CardIcon from '@mui/icons-material/CreditCardRounded';
import CashIcon from '@mui/icons-material/LocalAtmRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation, useGoogleMapAPI, useToast } from '@/hooks';
import { PaymentMethod, Vehicle } from '@/libs/enum';
import { bookARide } from '@/libs/query';
import { Directions, LoadingButton, Marker } from '@/libs/ui';
import { calculateDistance, formatDistance } from '@/libs/utils';
import SearchGroup from './SearchGroup';
import SelectMethodDialog from './SelectMethodDialog';
import SelectVehicle from './SelectVehicle';

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

export default function HomePage() {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [vehicle, setVehicle] = useState<Vehicle>('motorbike');
  const [distance, setDistance] = useState<number>(0);
  const { setToast } = useToast();
  const [open, setOpen] = useState(false);
  const [pickup, setPickup] = useState<google.maps.places.PlaceResult | null>(null);
  const [destination, setDestination] = useState<google.maps.places.PlaceResult | null>(null);
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();
  useEffect(() => {
    if (pickup?.geometry?.location && destination?.geometry?.location) {
      setDistance(calculateDistance(pickup.geometry.location, destination.geometry.location));
    }
  }, [pickup, destination]);

  const { mutate, isPending } = useMutation({
    mutationFn: bookARide,
    onSuccess: () => {
      setToast('success', 'Đăng xe thành công');
      router.push('/ride');
    },
    onError: (error) => {
      setToast('error', 'Đặt xe thất bại', error.message);
    },
  });

  const handleClose = (value: PaymentMethod) => {
    setOpen(false);
    setMethod(value);
  };

  const handleBook = () => {
    const data = {
      booking_route: {
        pick_up: {
          formattedAddress: pickup?.formatted_address,
          lat: pickup?.geometry?.location ? pickup.geometry.location.lat() : null,
          lng: pickup?.geometry?.location ? pickup.geometry.location.lng() : null,
          name: pickup?.name,
        },
        destination: {
          formattedAddress: destination?.formatted_address,
          lat: destination?.geometry?.location ? destination.geometry.location.lat() : null,
          lng: destination?.geometry?.location ? destination.geometry.location.lng() : null,
          name: destination?.name,
        },
      },
      vehicle_type: vehicle,
      payment_method: method,
    };
    mutate(data);
  };

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
            {pickup !== null && pickup.geometry?.location ? (
              <Marker position={pickup.geometry.location} type='pickup' role='passenger' />
            ) : null}
            {destination !== null && destination.geometry?.location ? (
              <Marker position={destination.geometry.location} type='destination' role='passenger' />
            ) : null}
            {pickup !== null && destination !== null ? (
              <Directions
                origin={pickup.geometry?.location as unknown as google.maps.LatLngLiteral}
                destination={destination.geometry?.location as unknown as google.maps.LatLngLiteral}
                mainDirection
              />
            ) : null}
          </Map>
          <SearchGroup
            onPickupChange={(place) => setPickup(place)}
            onDestinationChange={(place) => setDestination(place)}
          />
        </MapContainer>
      )}

      {pickup?.geometry?.location && destination?.geometry?.location ? (
        <Paper
          sx={{
            border: '1px solid #ccc',
            position: 'absolute',
            bottom: 56.8,
            borderRadius: '1rem 1rem 0 0',
            padding: 2,
            width: {
              xs: '100%',
              sm: '80%',
              md: '50%',
            },
          }}>
          <Stack justifyContent='space-between'>
            <Typography>Khoảng cách: {formatDistance(distance)}</Typography>
            <SelectVehicle distance={distance} onSelectVehicle={(vehicle) => setVehicle(vehicle)} selected={vehicle} />
            <Divider />
            <ListItemButton onClick={() => setOpen(true)}>
              {method == 'cash' ? (
                <>
                  <ListItemIcon sx={{ minWidth: '2rem' }}>
                    <CashIcon />
                  </ListItemIcon>
                  <ListItemText>Tiền mặt</ListItemText>
                </>
              ) : (
                <>
                  <ListItemIcon sx={{ minWidth: '2rem' }}>
                    <CardIcon />
                  </ListItemIcon>
                  <ListItemText>Thẻ</ListItemText>
                </>
              )}
              <ListItemIcon sx={{ minWidth: 'fit-content' }}>
                <ChevronRightIcon />
              </ListItemIcon>
            </ListItemButton>
            <LoadingButton loading={isPending} onClick={handleBook}>
              Đặt ngay
            </LoadingButton>
            <SelectMethodDialog open={open} selectedValue={method} onClose={handleClose} />
          </Stack>
        </Paper>
      ) : null}
    </Main>
  );
}
