'use client';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Alert from '@mui/material/Alert';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { Vehicle } from '@/libs/enum';
import LocationRecords from '@/libs/mocks/locationRecords.json';
import { createRideFromStaffHalf } from '@/libs/query';
import { InputLayout, LoadingButton } from '@/libs/ui';
import { RideFromStaffSchema } from '@/libs/validations';
import { destinationState, fullRideState, pickupState, PlaceOptionType } from './atom';

const filter = createFilterOptions<PlaceOptionType>();
interface AlertProps {
  severity: 'error' | 'warning';
  message: string;
}

function CustomAutoComplete({ onSelect }: { onSelect: (value: PlaceOptionType | null) => void }) {
  const [value, setValue] = useState<PlaceOptionType | null>(null);

  return (
    <Autocomplete
      id='free-solo-demo'
      freeSolo
      value={value}
      onChange={(_event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            formatted_address: newValue,
          });
          onSelect({
            formatted_address: newValue,
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
        return option.formatted_address;
      }}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.formatted_address}
        </li>
      )}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return filtered;
      }}
      options={LocationRecords}
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

export default function BasicInfoForm() {
  const [pickup, setPickup] = useRecoilState(pickupState);
  const [destination, setDestination] = useRecoilState(destinationState);
  const setFullRide = useSetRecoilState(fullRideState);
  const [alertMessage, setAlertMessage] = useState<AlertProps | null>({
    severity: 'error',
    message: 'Vui lòng chọn cả điểm đón và điểm trả khách',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createRideFromStaffHalf,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      alert(data);
    },
  });

  const handleSubmit = ({ name, phone, vehicle_type }: { name: string; phone: string; vehicle_type: Vehicle }) => {
    if (pickup && destination) {
      if (pickup.id && destination.id) {
        const request = {
          name,
          phone,
          vehicle_type,
          booking_route: {
            pick_up: pickup.id,
            destination: destination.id,
          },
        };
        setFullRide(request);
      } else {
        const request = {
          name,
          phone,
          vehicle_type,
          booking_route: {
            pick_up: pickup?.id || pickup?.formatted_address,
            destination: destination?.id || destination?.formatted_address,
          },
        };
        mutate(request);
      }
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
      {alertMessage && <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>}
      <Formik
        initialValues={{
          name: '',
          phone: '',
          vehicle_type: 'motorbike' as Vehicle,
        }}
        validationSchema={RideFromStaffSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => {
          return (
            <Form>
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
                <LoadingButton type='submit' loading={isPending}>
                  {!alertMessage ? 'Điều phối' : 'Tạo cuốc'}
                </LoadingButton>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
