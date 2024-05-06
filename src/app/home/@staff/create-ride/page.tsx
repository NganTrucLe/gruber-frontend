'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AdvancedMarker, APIProvider, Map, Pin, useMap } from '@vis.gl/react-google-maps';

import { Box, IconButton, InputAdornment, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation, useGoogleMapAPI } from '@/hooks';
import { colors, Directions, InputLayout, PlaceAutocomplete } from '@/libs/ui';

function SearchGroup({
  onPickupChange,
  onDestinationChange,
}: {
  onPickupChange: (place: google.maps.places.PlaceResult | null) => void;
  onDestinationChange: (place: google.maps.places.PlaceResult | null) => void;
}) {
  const map = useMap();

  const changeCenter = (place: google.maps.places.PlaceResult) => {
    const location = place.geometry?.location;
    map?.setCenter({
      lat: location?.lat() || 0,
      lng: location?.lng() || 0,
    });
    map?.setZoom(17);
  };

  const handlePickupChange = (place: google.maps.places.PlaceResult) => {
    changeCenter(place);
    onPickupChange?.(place);
  };

  const handleDestinationChange = (place: google.maps.places.PlaceResult) => {
    changeCenter(place);
    onDestinationChange?.(place);
  };

  return (
    <>
      <InputLayout label='Điểm đón khách'>
        <PlaceAutocomplete
          defaultStyle
          onPlaceSelect={(place) => handlePickupChange(place)}
          onClear={() => onPickupChange(null)}
          inputProps={{
            placeholder: 'Địa điểm đón?',
            startAdornment: (
              <InputAdornment position='start'>
                <MyLocationIcon color='primary' fontSize='small' />
              </InputAdornment>
            ),
          }}
        />
      </InputLayout>
      <InputLayout label='Điểm trả khách'>
        <PlaceAutocomplete
          defaultStyle
          onPlaceSelect={(place) => handleDestinationChange(place)}
          onClear={() => onDestinationChange(null)}
          inputProps={{
            placeholder: 'Bạn muốn đến đâu?',
            startAdornment: (
              <InputAdornment position='start'>
                <MyLocationIcon color='error' fontSize='small' />
              </InputAdornment>
            ),
          }}
        />
      </InputLayout>
    </>
  );
}

export default function CreateRidePage() {
  const [pickup, setPickup] = useState<google.maps.places.PlaceResult | null>(null);
  const [destination, setDestination] = useState<google.maps.places.PlaceResult | null>(null);
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();

  return (
    <main>
      <Stack direction='row' spacing={2}>
        {apiKey === undefined ? (
          <Typography variant='h6'>Không thể tải map</Typography>
        ) : (
          <APIProvider apiKey={apiKey}>
            <Box sx={{ position: 'relative', height: '100vh', width: '100%', flexGrow: 1 }}>
              <Map
                defaultCenter={position}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={mapId}>
                <AdvancedMarker position={position} title={'Vị trí của tôi'}>
                  <MyLocationIcon fontSize='large' sx={{ color: 'blue' }} color='primary' />
                </AdvancedMarker>
                {pickup !== null ? (
                  <AdvancedMarker position={pickup.geometry?.location} title={'Điểm đón'}>
                    <Pin background={colors.green[500]} glyphColor='white' borderColor={colors.green[600]} scale={1.5}>
                      <Typography variant='h6'>1</Typography>
                    </Pin>{' '}
                  </AdvancedMarker>
                ) : null}
                {destination !== null ? (
                  <AdvancedMarker position={destination.geometry?.location} title={'Điểm đến'}>
                    <Pin
                      background={colors.notification.error}
                      glyphColor='white'
                      borderColor={colors.notification.error}
                      scale={1.5}>
                      <Typography variant='h6'>2</Typography>
                    </Pin>{' '}
                  </AdvancedMarker>
                ) : null}
                {pickup !== null && destination !== null ? (
                  <Directions
                    origin={pickup.geometry?.location as unknown as google.maps.LatLngLiteral}
                    destination={destination.geometry?.location as unknown as google.maps.LatLngLiteral}
                    mainDirection
                  />
                ) : null}
              </Map>
            </Box>
            <Stack spacing={2} sx={{ width: '100%', flexGrow: 1, py: 2, pr: 2 }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                <IconButton component={Link} href='/home'>
                  <BackIcon />
                </IconButton>
                &emsp;Tạo cuốc xe mới
              </Typography>
              <SearchGroup
                onPickupChange={(place) => setPickup(place)}
                onDestinationChange={(place) => setDestination(place)}
              />
              <InputLayout label='Tên khách hàng' />
              <InputLayout label='Số điện thoại' />
              <InputLayout label='Loại xe'>
                <Select>
                  <MenuItem value='motorbike'>Xe máy</MenuItem>
                  <MenuItem value='4-seat car'>Xe 4 chỗ</MenuItem>
                  <MenuItem value='7-seat car'>Xe 7 chỗ</MenuItem>
                </Select>
              </InputLayout>
              <Button>Tạo cuốc</Button>
            </Stack>
          </APIProvider>
        )}
      </Stack>
    </main>
  );
}
