'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import BackIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import MyLocationIcon from '@mui/icons-material/RadioButtonCheckedRounded';

import { useCurrentLocation, useGoogleMapAPI, useToast } from '@/hooks';
import { Vehicle } from '@/libs/enum';
import { ILocationRecord, IRideFromStaff } from '@/libs/interfaces';
import { createRideFromStaffFull } from '@/libs/query';
import { LoadingButton, Marker } from '@/libs/ui';
import { roleState } from '@/recoils';
import BasicInfoForm from './BasicInfoForm';

const DynamicChooseDriver = dynamic(() => import('./ChooseDriver'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const DynamicLocate = dynamic(() => import('./Locate'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function CreateRidePage() {
  const { setToast } = useToast();
  const [role] = useRecoilState(roleState);
  const router = useRouter();
  const position = useCurrentLocation();
  const { apiKey, mapId } = useGoogleMapAPI();
  const newRideState = useState<IRideFromStaff | null>(null);
  const pickupState = useState<ILocationRecord | null>(null);
  const destinationState = useState<ILocationRecord | null>(null);
  const [pickup] = pickupState;
  const [destination] = destinationState;
  const [newRide] = newRideState;
  const [step, setStep] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: createRideFromStaffFull,
    onError: (error) => {
      setToast('error', 'Đặt xe thất bại', error.message);
    },
    onSuccess: ({ message }) => {
      setToast('success', message);
      router.push('/');
    },
  });

  const handleCreateRide = () => {
    if (newRide && newRide.driver_id && newRide.booking_route.pick_up && newRide.booking_route.destination) {
      mutate({
        ...newRide,
        booking_route: {
          pick_up: newRide.booking_route.pick_up,
          destination: newRide.booking_route.destination,
        },
        driver_id: newRide.driver_id,
        vehicle_type: newRide.vehicle_type as Vehicle,
      });
    }
  };

  const steps = [
    {
      label: 'Nhập thông tin cơ bản',
      content: (
        <BasicInfoForm
          pickupState={pickupState}
          destinationState={destinationState}
          rideState={newRideState}
          onSubmit={() => {
            if (newRide?.booking_route.pick_up && newRide?.booking_route.destination) setStep(2);
            else setStep(1);
          }}
        />
      ),
      button: (
        <Button type='submit' form='create-ride-step-1' sx={{ mt: 2 }}>
          Điều phối
        </Button>
      ),
    },
    {
      label: 'Định vị GPS (Optional)',
      content: (
        <DynamicLocate
          pickupState={pickupState}
          destinationState={destinationState}
          rideState={newRideState}
          onSubmit={() => setStep(2)}
        />
      ),
      button: null,
    },
    {
      label: 'Chọn tài xế',
      content: (
        <DynamicChooseDriver pickupState={pickupState} destinationState={destinationState} rideState={newRideState} />
      ),
      button: (
        <LoadingButton loading={isPending} onClick={handleCreateRide} sx={{ mt: 2 }}>
          Tạo cuốc
        </LoadingButton>
      ),
    },
  ];

  if (role !== 'passenger') return null;
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
                {pickup?.location && <Marker position={pickup?.location} role='driver' />}
                {destination?.location && <Marker position={destination?.location} role='driver' type='destination' />}
              </Map>
            </Box>
            <Stack spacing={0} sx={{ width: '100%', flexGrow: 1, py: 2, pr: 2 }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                <IconButton component={Link} href='/'>
                  <BackIcon />
                </IconButton>
                &emsp;Tạo cuốc xe mới
              </Typography>
              <Stepper activeStep={step} alternativeLabel sx={{ mb: 2 }}>
                {steps.map((stepItem) => (
                  <Step key={stepItem.label}>
                    <StepLabel>{stepItem.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {steps[step].content}
              {steps[step].button}
            </Stack>
          </APIProvider>
        )}
      </Stack>
    </main>
  );
}
