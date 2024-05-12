'use client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import _ from 'lodash';

import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { VehicleType } from '@/libs/enum';
import { ILocationRecord, IRideFromStaff } from '@/libs/interfaces';
import { searchLocations } from '@/libs/query';
import { InputLayout } from '@/libs/ui';
import { RideFromStaffSchema } from '@/libs/validations';

interface AlertProps {
  severity: 'error' | 'warning';
  message: string;
}

function CustomAutoComplete({ onSelect }: { onSelect: (value: ILocationRecord | null) => void }) {
  const [value, setValue] = useState<ILocationRecord | null>(null);
  const [options, setOptions] = useState<ILocationRecord[]>([]);
  const [keyword, setKeyWord] = useState('');
  const [loading, setLoading] = useState(true);

  const {
    data: filterLocations,
    status: filterLocationsStatus,
    refetch,
  } = useQuery({
    queryKey: ['locations', keyword],
    queryFn: () => searchLocations(keyword),
  });

  useEffect(() => {
    if (filterLocationsStatus == 'success') {
      setLoading(false);
      setOptions(
        filterLocations.map(
          (loc: {
            coordinate: { coordinates: [number, number] };
            id: string;
            formattedAddress: string;
            name: string;
          }) => {
            const [lng, lat] = loc.coordinate.coordinates;
            return {
              id: loc.id,
              formattedAddress: loc.formattedAddress,
              name: loc.name,
              location: {
                lat,
                lng,
              },
            };
          }
        )
      );
    }
  }, [filterLocationsStatus, filterLocations]);

  return (
    <Autocomplete
      id='free-solo-demo'
      value={value}
      freeSolo
      loading={loading}
      onInputChange={(_e, input) => {
        setKeyWord(input);
        setLoading(true);
        refetch();
        if (input == '') {
          setValue(null);
          onSelect(null);
        } else {
          setValue({
            formattedAddress: input,
          });
          onSelect({
            formattedAddress: input,
          });
        }
      }}
      onChange={(_event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            formattedAddress: newValue,
          });
          onSelect({
            formattedAddress: newValue,
          });
        } else {
          setValue(newValue);
          onSelect(newValue);
        }
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.formattedAddress;
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id} style={{ textOverflow: 'ellipsis' }}>
          <b>{option.name}</b> {option.formattedAddress}
        </li>
      )}
      options={options}
      componentsProps={{
        paper: {
          elevation: 2,
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          variant='outlined'
          sx={{
            '& .MuiInputBase-input': {
              paddingTop: 0,
            },
          }}
        />
      )}
    />
  );
}

export default function BasicInfoForm({
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
  const [_ride, setRide] = rideState;
  const [alertMessage, setAlertMessage] = useState<AlertProps | null>({
    severity: 'error',
    message: 'Vui lòng chọn cả điểm đón và điểm trả khách',
  });

  const handleSubmit = ({ name, phone, vehicle_type }: { name: string; phone: string; vehicle_type: VehicleType }) => {
    if (pickup && destination) {
      const request = {
        name,
        phone,
        vehicle_type,
        booking_route: {},
      };
      if (pickup.id) {
        _.set(request, 'booking_route.pick_up', pickup.id);
      }
      if (destination.id) {
        _.set(request, 'booking_route.destination', destination.id);
      }
      setRide(request);
      onSubmit();
    }
  };

  useEffect(() => {
    if (pickup && destination) {
      if (pickup.id && destination.id) {
        setAlertMessage(null);
      } else {
        setAlertMessage({
          severity: 'warning',
          message: 'Điểm chọn không có trong hệ thống, bạn sẽ phải định vị trước khi điều phối',
        });
      }
    } else {
      setAlertMessage({
        severity: 'error',
        message: 'Vui lòng chọn cả điểm đón và điểm trả khách',
      });
    }
  }, [pickup, destination]);

  return (
    <>
      {alertMessage && (
        <Alert severity={alertMessage.severity} sx={{ mb: 2 }}>
          {alertMessage.message}
        </Alert>
      )}
      <Formik
        initialValues={{
          name: '',
          phone: '',
          vehicle_type: 'motorbike' as VehicleType,
        }}
        validationSchema={RideFromStaffSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => {
          return (
            <Form id='create-ride-step-1'>
              <Stack spacing={2} sx={{ width: '100%', flexGrow: 1 }}>
                <InputLayout label='Điểm đón khách'>
                  <CustomAutoComplete onSelect={(value) => setPickup(value)} />
                </InputLayout>
                <InputLayout label='Điểm trả khách'>
                  <CustomAutoComplete onSelect={(value) => setDestination(value)} />
                </InputLayout>
                <InputLayout
                  label='Tên khách hàng'
                  helperText={touched.name ? errors.name : ''}
                  inputProps={{ name: 'name', error: touched.name && errors.name ? true : false }}
                  formik
                />
                <InputLayout
                  label='Số điện thoại'
                  helperText={touched.phone ? errors.phone : ''}
                  inputProps={{ name: 'phone', error: touched.phone && errors.phone ? true : false }}
                  formik
                />
                <InputLayout label='Loại xe' helperText={touched.vehicle_type ? errors.vehicle_type : ''}>
                  <Field
                    as={Select}
                    name='vehicle_type'
                    error={touched.vehicle_type && errors.vehicle_type ? true : false}>
                    <MenuItem value='motorbike'>Xe máy</MenuItem>
                    <MenuItem value='car4'>Xe 4 chỗ</MenuItem>
                    <MenuItem value='car7'>Xe 7 chỗ</MenuItem>
                  </Field>
                </InputLayout>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
