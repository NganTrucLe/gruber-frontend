'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedMarker, APIProvider, Map, useMap } from '@vis.gl/react-google-maps';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import CircleIcon from '@mui/icons-material/FiberManualRecordRounded';
import FlashOffIcon from '@mui/icons-material/FlashOffRounded';
import FlashIcon from '@mui/icons-material/FlashOnRounded';
import NearMeRoundedIcon from '@mui/icons-material/NearMeRounded';
import PowerIcon from '@mui/icons-material/PowerSettingsNewRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import RefreshIcon from '@mui/icons-material/RefreshRounded';
import IncomeIcon from '@mui/icons-material/SignalCellularAltRounded';
import StarIcon from '@mui/icons-material/StarRounded';

import { useCurrentLocation, useFirebaseMessaging, useGoogleMapAPI } from '@/hooks';
import IncomeOptions from './IncomeOptions';
import { AutoNotiDialog, ManualNotiDialog } from './NotiDialog';

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

function MyLocation() {
  const map = useMap();
  const position = useCurrentLocation();

  return (
    <Stack sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
      <IconButton
        size='large'
        sx={{ width: 'fit-content' }}
        onClick={() => {
          map?.setCenter(position);
          map?.setZoom(17);
        }}>
        <NearMeRoundedIcon />
      </IconButton>
      <Typography sx={{ width: 'auto', textAlign: 'center' }}>Vị trí của tôi</Typography>
    </Stack>
  );
}

function MessageOffline() {
  return (
    <Stack direction='row' alignItems={'center'}>
      <CircleIcon color='error' fontSize='small' sx={{ mr: 1 }} />
      <Typography>Bạn đang offline</Typography>
    </Stack>
  );
}

function MessageAuto() {
  return (
    <Stack direction='row' alignItems={'center'}>
      <FlashIcon color='primary' fontSize='small' sx={{ mr: 1 }} />
      <Typography>Đang bật chế độ tự động nhận cuốc xe.</Typography>
    </Stack>
  );
}

function MessageManual() {
  return (
    <Stack direction='row' alignItems={'center'}>
      <FlashOffIcon fontSize='small' sx={{ mr: 1 }} />
      <Typography>Đang bật chế độ nhận cuốc xe thủ công.</Typography>
    </Stack>
  );
}

interface Noti {
  pickup: string;
  destination: string;
}
export default function HomePage() {
  const [online, setOnline] = useState(true);
  const [message, setMessage] = useState<ReactNode>(null);
  const [auto, setAuto] = useState(false);
  const [newRide, setNewRide] = useState<Noti | null>(null);
  const [openIncome, setOpenIncome] = useState(false);
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();
  const router = useRouter();
  useFirebaseMessaging((payload) => {
    const data: Noti = {
      pickup: payload.data.pickup,
      destination: payload.data.destination,
    };
    setNewRide(data);
  });

  const handleChangeOnline = () => {
    setOnline(!online);
    // TODO: Trigger to firebase
  };

  const handleAuto = () => {
    setAuto(!auto);
    // TODO: Handle more when get notification from firebase
  };

  const handleDecline = () => {
    setNewRide(null);
    // TODO: Trigger to firebase to decline
    // ...
  };

  const handleAccept = () => {
    setNewRide(null);
    // Trigger to firebase and backend to accept
    // ...
    router.push('/ride');
  };

  useEffect(() => {
    if (!online) {
      setMessage(<MessageOffline />);
    } else {
      if (auto) {
        setMessage(<MessageAuto />);
      } else setMessage(<MessageManual />);
    }
  }, [online, auto]);

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
          </Map>
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
            direction='row'
            justifyContent={openIncome ? 'flex-end' : 'space-between'}>
            {openIncome ? null : (
              <Button
                variant='secondary'
                size='large'
                startIcon={<IncomeIcon fontSize='small' />}
                onClick={() => setOpenIncome(true)}>
                Thu nhập
              </Button>
            )}
            <IncomeOptions open={openIncome} onClick={() => setOpenIncome(false)} />
            <Stack alignItems='center'>
              <Avatar
                sx={{
                  marginBottom: '4px',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => router.push('/profile')}
              />
              <Chip
                icon={<StarIcon sx={{ color: 'orange !important' }} />}
                label='5.00'
                variant='outlined'
                size='small'
                sx={{ color: 'black' }}
              />
            </Stack>
          </Stack>
          <Stack
            sx={{
              position: 'absolute',
              bottom: 0,
              width: {
                xs: '100%',
                sm: '80%',
                md: '50%',
              },
              px: 2,
            }}>
            <Stack direction='row' justifyContent='space-between'>
              <Fab
                sx={{
                  width: online ? '4rem' : 'fit-content',
                  height: '4rem',
                  mb: 2,
                  borderRadius: '4rem',
                  boxShadow: 0,
                  ...(online
                    ? {}
                    : {
                        bgcolor: 'black',
                        '&:hover': {
                          bgcolor: 'darkgray',
                        },
                      }), // Explicitly assign bgColor property when online is false
                }}
                color='primary'
                onClick={handleChangeOnline}
                variant='extended'>
                <PowerIcon fontSize='large' sx={{ mr: online ? 0 : 1 }} />
                {online ? null : 'Bật kết nối'}
              </Fab>
              <Fab sx={{ width: '4rem', height: '4rem', mb: 2, boxShadow: 0, bgcolor: 'white !important' }}>
                <RefreshIcon fontSize='large' />
              </Fab>
            </Stack>
            {message ? (
              <Paper
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  p: 2,
                  mb: 2,
                }}>
                {message}
              </Paper>
            ) : null}
            <Paper
              sx={{
                border: '1px solid #ccc',
                borderRadius: '1rem 1rem 0 0',
                py: 4,
                display: 'flex',
                justifyContent: 'space-around',
              }}>
              <Stack sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <IconButton size='large' sx={{ width: 'fit-content' }} onClick={handleAuto}>
                  {auto ? <FlashIcon color='primary' /> : <FlashOffIcon />}
                </IconButton>
                <Typography sx={{ width: 'auto', textAlign: 'center' }}>
                  {auto ? 'Tự động nhận' : 'Nhận thủ công'}
                </Typography>
              </Stack>
              <Divider orientation='vertical' flexItem />
              <MyLocation />
            </Paper>
          </Stack>
        </MapContainer>
      )}
      {auto && Boolean(newRide) ? (
        <AutoNotiDialog open={Boolean(newRide)} onClose={handleAccept} />
      ) : (
        <ManualNotiDialog
          props={{ open: Boolean(newRide), onClose: handleDecline }}
          bookingInfo={newRide}
          onAccept={() => handleAccept()}
          onDecline={() => handleDecline()}
        />
      )}
    </Main>
  );
}
