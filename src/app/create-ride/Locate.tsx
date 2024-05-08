'use client';
import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Form, Formik } from 'formik';
import _ from 'lodash';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';

import { ILocationRecord, IRideFromStaff } from '@/libs/interfaces';
import { createLocation } from '@/libs/query';
import { InputLayout, LoadingButton } from '@/libs/ui';
import { NewLocationRecordSchema } from '@/libs/validations';

export default function Locate({
  pickupState,
  destinationState,
  rideState,
  onSubmit,
}: {
  pickupState: [ILocationRecord | null, Dispatch<SetStateAction<ILocationRecord | null>>];
  destinationState: [ILocationRecord | null, Dispatch<SetStateAction<ILocationRecord | null>>];
  rideState: [IRideFromStaff | null, Dispatch<SetStateAction<IRideFromStaff | null>>];
  onSubmit: () => void;
}) {
  const [pickup, setPickup] = pickupState;
  const [destination, setDestination] = destinationState;
  const [ride, setRide] = rideState;
  const map = useMap();
  const Place = useMapsLibrary('places');
  const { mutate, isPending } = useMutation({
    mutationFn: createLocation,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ({ data }) => {
      setRide((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          booking_route: {
            pick_up: data.id,
            destination: prev.booking_route.destination,
          },
        };
      });
    },
  });
  const { mutate: mutateDestination, isPending: isPendingDestination } = useMutation({
    mutationFn: createLocation,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: ({ data }) => {
      setRide((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          booking_route: {
            pick_up: prev.booking_route.pick_up,
            destination: data.id,
          },
        };
      });
    },
  });

  const handleSubmitPickup = (values: { name: string; formattedAddress: string }) => {
    const request = {
      query: values.formattedAddress,
      fields: ['name', 'formatted_address', 'geometry'],
    };
    if (map) {
      if (!Place) return;
      const service = new Place.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (results) {
            if (results[0].geometry?.location) {
              map.setCenter(results[0].geometry.location);
            }
            setPickup({
              name: results[0].name,
              formattedAddress: results[0].formatted_address ?? '', // Add nullish coalescing operator to provide a default value
              location: {
                lat: results[0].geometry?.location?.lat() || 0,
                lng: results[0].geometry?.location?.lng() || 0,
              },
            });
          }
        }
      });
    } else console.error('Map is not ready');
  };

  const handleSubmitDestination = (values: { name: string; formattedAddress: string }) => {
    const request = {
      query: values.formattedAddress,
      fields: ['name', 'formatted_address', 'geometry'],
    };
    if (map) {
      if (!Place) return;
      const service = new Place.PlacesService(map);
      service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (results) {
            if (results[0].geometry?.location) {
              map.setCenter(results[0].geometry.location);
            }
            setDestination({
              name: results[0].name,
              formattedAddress: results[0].formatted_address ?? '', // Add nullish coalescing operator to provide a default value
              location: {
                lat: results[0].geometry?.location?.lat() || 0,
                lng: results[0].geometry?.location?.lng() || 0,
              },
            });
          }
        }
      });
    } else console.error('Map is not ready');
  };

  const handleSubmit = () => {
    if (!ride) return;
    if (!ride.booking_route.pick_up) return;
    if (!ride.booking_route.destination) return;
    onSubmit();
  };

  return (
    <Stack spacing={1}>
      {ride?.booking_route.pick_up ? (
        <Typography textAlign='center'>Điểm đón đã được định vị</Typography>
      ) : (
        <>
          <Typography variant='h6'>Điểm đón</Typography>
          <Formik
            initialValues={{
              name: '',
              formattedAddress: pickup?.formattedAddress || '',
            }}
            onSubmit={(values) => {
              handleSubmitPickup(values);
            }}
            validationSchema={NewLocationRecordSchema}
            enableReinitialize={true}>
            {({ errors, touched }) => (
              <Form id='pick_up'>
                <Stack spacing={2}>
                  <InputLayout
                    label='Tên địa điểm'
                    inputProps={{
                      name: 'name',
                      placeholder: 'Nhập tên địa điểm',
                      value: pickup?.name || '',
                      onChange: (e) => {
                        setPickup({
                          ...pickup,
                          name: e.target.value,
                          formattedAddress: pickup?.formattedAddress || '', // Add default value for formattedAddress
                        });
                      },
                    }}
                    formik
                  />
                  <InputLayout
                    label='Địa chỉ'
                    inputProps={{
                      name: 'formattedAddress',
                      placeholder: 'Nhập địa chỉ',
                      error: errors.formattedAddress && touched.formattedAddress ? true : false,
                      value: pickup?.formattedAddress || '',
                      onChange: (e) => {
                        setPickup({
                          ...pickup,
                          formattedAddress: e.target.value,
                        });
                      },
                    }}
                    helperText={errors.formattedAddress && touched.formattedAddress ? errors.formattedAddress : ''}
                    formik
                  />
                </Stack>
              </Form>
            )}
          </Formik>
          <Stack direction='row' spacing={2}>
            <Button
              color='info'
              type='submit'
              startIcon={<MyLocationRoundedIcon />}
              sx={{ width: 'fit-content' }}
              form='pick_up'>
              Định vị điểm đón
            </Button>
            <LoadingButton
              color='info'
              loading={isPending}
              sx={{ width: 'fit-content' }}
              onClick={() => {
                if (pickup && pickup.location) {
                  const req = {
                    name: pickup.name || '',
                    formattedAddress: pickup.formattedAddress,
                    lat: pickup.location.lat,
                    lng: pickup.location.lng,
                  };
                  mutate(req);
                }
              }}>
              Lưu
            </LoadingButton>
          </Stack>
        </>
      )}

      {ride?.booking_route.destination ? (
        <Typography textAlign='center'>Điểm trả khách đã được định vị</Typography>
      ) : (
        <>
          <Typography variant='h6'>Điểm trả khách</Typography>
          <Formik
            initialValues={{
              name: '',
              formattedAddress: destination?.formattedAddress || '',
            }}
            onSubmit={(values) => {
              handleSubmitDestination(values);
            }}
            validationSchema={NewLocationRecordSchema}
            enableReinitialize={true}>
            {({ errors, touched }) => (
              <Form id='destination'>
                <Stack spacing={2}>
                  <InputLayout
                    label='Tên địa điểm'
                    inputProps={{
                      name: 'name',
                      placeholder: 'Nhập tên địa điểm',
                      value: destination?.name || '',
                      onChange: (e) => {
                        setPickup({
                          ...destination,
                          name: e.target.value,
                          formattedAddress: destination?.formattedAddress || '', // Add default value for formattedAddress
                        });
                      },
                    }}
                    formik
                  />
                  <InputLayout
                    label='Địa chỉ'
                    inputProps={{
                      name: 'formattedAddress',
                      placeholder: 'Nhập địa chỉ',
                      error: errors.formattedAddress && touched.formattedAddress ? true : false,
                      value: destination?.formattedAddress || '',
                      onChange: (e) => {
                        setPickup({
                          ...destination,
                          formattedAddress: e.target.value,
                        });
                      },
                    }}
                    helperText={errors.formattedAddress && touched.formattedAddress ? errors.formattedAddress : ''}
                    formik
                  />
                </Stack>
              </Form>
            )}
          </Formik>
          <Stack direction='row' spacing={2}>
            <Button
              color='info'
              type='submit'
              startIcon={<MyLocationRoundedIcon />}
              sx={{ width: 'fit-content' }}
              form='destination'>
              Định vị điểm trả
            </Button>
            <LoadingButton
              color='info'
              loading={isPendingDestination}
              sx={{ width: 'fit-content' }}
              onClick={() => {
                if (destination && destination.location) {
                  const req = {
                    name: destination.name || '',
                    formattedAddress: destination.formattedAddress,
                    lat: destination.location.lat,
                    lng: destination.location.lng,
                  };
                  mutateDestination(req);
                }
              }}>
              Lưu
            </LoadingButton>
          </Stack>
        </>
      )}
      <Button type='submit' form='create-ride-step-2' sx={{ mt: 2 }} onClick={() => handleSubmit()}>
        Chọn tài xế
      </Button>
    </Stack>
  );
}
