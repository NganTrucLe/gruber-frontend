'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation, useGoogleMapAPI } from '@/hooks';
import { Directions, Marker } from '@/libs/ui';
import { destinationState, pickupState } from './atom';

export default function LayoutCreateRide({ children }: { children: ReactNode }) {
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();
  const [pickup] = useRecoilState(pickupState);
  const [destination] = useRecoilState(destinationState);

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
                {pickup?.geometry?.location && <Marker position={pickup?.geometry?.location} role='driver' />}
                {destination?.geometry?.location && (
                  <Marker position={destination?.geometry?.location} role='driver' type='destination' />
                )}
                {pickup?.geometry?.location && destination?.geometry?.location && (
                  <Directions
                    origin={pickup?.geometry?.location}
                    destination={destination?.geometry?.location}
                    mainDirection
                  />
                )}
              </Map>
            </Box>
            <Stack spacing={2} sx={{ width: '100%', flexGrow: 1, py: 2, pr: 2 }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                <IconButton component={Link} href='/home'>
                  <BackIcon />
                </IconButton>
                &emsp;Tạo cuốc xe mới
              </Typography>
              {children}
            </Stack>
          </APIProvider>
        )}
      </Stack>
    </main>
  );
}
