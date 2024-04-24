'use client';
import React, { useState } from 'react';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';

import {
  Dialog,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';
import CardIcon from '@mui/icons-material/CreditCardRounded';
import CashIcon from '@mui/icons-material/LocalAtmRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation } from '@/hooks';
import { PlaceAutocomplete } from '@/libs/ui';
import { calculateDistance } from '@/libs/utils';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAe_FAtgZw3zJZN9RySh-4WMVHzXruyuaA';
const GOOGLE_MAPS_ID = 'adf136d39bc00bf9';

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

function SearchGroup({
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

type Method = 'cash' | 'bank';

interface SelectMethodDialogProps {
  open: boolean;
  selectedValue: Method;
  onClose: (value: Method) => void;
}

function SelectMethodDialog(props: SelectMethodDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    if (value === 'cash' || !value) {
      onClose(value as Method);
    } else if (value === 'bank') onClose(value as Method);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
      <List>
        <ListItem>
          <ListItemButton onClick={() => handleListItemClick('cash')} selected={selectedValue === 'cash'}>
            <ListItemIcon>
              <CashIcon />
            </ListItemIcon>
            <ListItemText primary='Tiền mặt' />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleListItemClick('bank')} selected={selectedValue === 'bank'}>
            <ListItemIcon>
              <CardIcon />
            </ListItemIcon>
            <ListItemText primary='Thẻ' />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function HomePage() {
  const [method, setMethod] = useState<'cash' | 'bank'>('bank');
  const [open, setOpen] = useState(false);
  const [pickup, setPickup] = useState<google.maps.places.PlaceResult | null>(null);
  const [destination, setDestination] = useState<google.maps.places.PlaceResult | null>(null);
  const position = useCurrentLocation();

  const handleClose = (value: Method) => {
    setOpen(false);
    setMethod(value);
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
            {pickup !== null ? (
              <AdvancedMarker position={pickup.geometry?.location} title={'Điểm đón'}>
                <PlaceRoundedIcon color='primary' fontSize='large' sx={{ width: '3rem', height: '3rem' }} />
              </AdvancedMarker>
            ) : null}
            {destination !== null ? (
              <AdvancedMarker position={destination.geometry?.location} title={'Điểm đến'}>
                <PlaceRoundedIcon sx={{ color: 'red', width: '3rem', height: '3rem' }} fontSize='large' />
              </AdvancedMarker>
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
            bottom: 0,
            borderRadius: '1rem 1rem 0 0',
            padding: 2,
            width: {
              xs: '100%',
              sm: '80%',
              md: '50%',
            },
          }}>
          <Stack justifyContent='space-between'>
            <div>
              <Typography variant='body1'>
                Khoảng cách:{' '}
                {(() => {
                  const distance = calculateDistance(pickup.geometry.location, destination.geometry.location);
                  if (distance < 1) {
                    return `${(distance * 1000).toFixed(0)} m`;
                  } else {
                    return `${distance.toFixed(2)} km`;
                  }
                })()}
              </Typography>
              <ListItemButton>
                <Stack width='100%' direction='row' justifyContent='space-between'>
                  <Typography variant='body1' fontWeight='600'>
                    Xe máy
                  </Typography>
                  <Typography variant='body1' fontWeight='600'>
                    20.000đ
                  </Typography>
                </Stack>
              </ListItemButton>
              <ListItemButton>
                <Stack width='100%' direction='row' justifyContent='space-between'>
                  <Typography variant='body1' fontWeight='600'>
                    Xe hơi 4 chỗ
                  </Typography>
                  <Typography variant='body1' fontWeight='600'>
                    20.000đ
                  </Typography>
                </Stack>
              </ListItemButton>
              <ListItemButton>
                <Stack width='100%' direction='row' justifyContent='space-between'>
                  <Typography variant='body1' fontWeight='600'>
                    Xe hơi 7 chỗ
                  </Typography>
                  <Typography variant='body1' fontWeight='600'>
                    20.000đ
                  </Typography>
                </Stack>
              </ListItemButton>
            </div>
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
            <Button>Đặt ngay</Button>
            <SelectMethodDialog open={open} selectedValue={method} onClose={handleClose} />
          </Stack>
        </Paper>
      ) : null}
    </Main>
  );
}
