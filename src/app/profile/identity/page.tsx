'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik, Field } from 'formik';

import { MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { createVehicle, getVehicleByDriverId } from '@/libs/query';
import { InputLayout, Main, TopAppBar, LoadingButton } from '@/libs/ui';
import { useToast } from '@/hooks';
import { getStoredValue } from '@/libs/utils';
import { IdentitySchema } from '@/libs/validations';
import { VehicleType } from '@/libs/enum';

interface Vehicle {
  type: VehicleType;
  plate: string;
  description: string;
}

export default function BankCardPage() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const userId = getStoredValue('user_id');

  const { data, status } = useQuery({
    queryKey: ['vehicle'],
    queryFn: () => getVehicleByDriverId(userId),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['vehicle'],
    mutationFn: (values: Vehicle) => {
      return createVehicle(userId, values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicle'] });
      toast.setToast('success', 'Thêm xe thành công');
    },
    onError: (error) => {
      toast.setToast('error', error.message);
    },
  });

  return (
    <Main>
      <TopAppBar title='Đăng ký xe' backHref='/profile' />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
            },
          }}>
          {status === 'success' && (
            <Formik
              initialValues={
                Boolean(data)
                  ? (data as Vehicle)
                  : ({
                      type: VehicleType.MOTORBIKE,
                      plate: '',
                      description: '',
                    } as Vehicle)
              }
              validationSchema={IdentitySchema}
              onSubmit={(values) => {
                mutate(values);
              }}>
              {({ touched, errors }) => {
                return (
                  <Form>
                    <Stack spacing={2}>
                      <InputLayout label='Loại xe' formik helperText={touched.type && errors.type ? errors.type : ''}>
                        <Field as={Select} name='type' error={touched.type && errors.type ? true : false}>
                          <MenuItem value={VehicleType.MOTORBIKE}>Xe máy</MenuItem>
                          <MenuItem value={VehicleType.CAR4}>Xe 4 chỗ</MenuItem>
                          <MenuItem value={VehicleType.CAR7}>Xe 7 chỗ</MenuItem>
                        </Field>
                      </InputLayout>

                      <InputLayout
                        label='Biển số xe'
                        inputProps={{
                          name: 'plate',
                          placeholder: '59A1-12345',
                          error: touched.plate && errors.plate ? true : false,
                        }}
                        helperText={touched.plate && errors.plate ? errors.plate : ''}
                        formik
                      />
                      <InputLayout
                        label='Tên mẫu xe'
                        inputProps={{
                          name: 'description',
                          placeholder: 'Honda SH 150i, Toyota Vios 2021, ...',
                          error: touched.description && errors.description ? true : false,
                        }}
                        helperText={touched.description && errors.description ? errors.description : ''}
                        formik
                      />
                      <LoadingButton variant='contained' type='submit' loading={isPending} disabled={Boolean(data)}>
                        Xác thực
                      </LoadingButton>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          )}
        </Box>
      </Box>
    </Main>
  );
}
