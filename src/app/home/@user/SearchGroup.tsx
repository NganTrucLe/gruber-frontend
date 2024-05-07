'use client';
import React from 'react';
import { useMap } from '@vis.gl/react-google-maps';

import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation } from '@/hooks';
import { PlaceAutocomplete } from '@/libs/ui';

export default function SearchGroup({
  onPickupChange,
  onDestinationChange,
}: {
  onPickupChange: (place: google.maps.places.PlaceResult | null) => void;
  onDestinationChange: (place: google.maps.places.PlaceResult | null) => void;
}) {
  const map = useMap();
  const position = useCurrentLocation();

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
    <Stack
      sx={{
        position: 'absolute',
        top: {
          xs: '1rem',
          sm: '2rem',
        },
        width: {
          xs: 'calc(100vw - 2rem)',
          sm: '80%',
          md: '50%',
        },
      }}
      spacing={{
        xs: 1,
        md: 2,
      }}>
      <PlaceAutocomplete
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
      <PlaceAutocomplete
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
      <Button
        onClick={() => {
          map?.setCenter(position);
          map?.setZoom(17);
        }}
        sx={{
          width: 'fit-content',
        }}
        startIcon={<NearMeRoundedIcon fontSize='small' />}>
        Vị trí của tôi
      </Button>
    </Stack>
  );
}
