'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { getProfile, updateInfo } from '@/libs/query';
import { InputLayout, Main, TopAppBar, LoadingButton } from '@/libs/ui';
import { useToast } from '@/hooks';
import { GeneralInfoSchema } from '@/libs/validations';

interface Info {
  fullName: string | '';
  phone: string | '';
}

export default function GeneroInfoPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();
  const [info, setInfo] = useState<Info>({
    fullName: '',
    phone: '',
  });

  const { data, status } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateInfo,
    onError: (error) => {
      toast.setToast('error', 'Cập nhật thông tin thất bại', error.message);
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['profile'], newData);
      toast.setToast('success', 'Cập nhật thông tin thành công');
    },
  });

  useEffect(() => {
    setInfo(data);
  }, [data, status]);

  if (status == 'pending') {
    return <p>Loading...</p>;
  }
  if (status == 'error') {
    router.push('/profile');
  }
  if (status == 'success') {
    return (
      <Main>
        <TopAppBar title='Thông tin cơ bản' backHref='/profile' />
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
            <Formik initialValues={info} onSubmit={mutate} validationSchema={GeneralInfoSchema} enableReinitialize>
              {({ errors, touched }) => {
                return (
                  <Form>
                    <Stack spacing={2}>
                      <InputLayout
                        label='Họ tên'
                        formik
                        inputProps={{
                          name: 'fullName',
                          placeholder: 'Nguyễn Văn A',
                          error: touched.fullName && errors.fullName ? true : false,
                        }}
                        helperText={touched.fullName ? errors.fullName : ''}
                      />
                      <InputLayout
                        label='Số điện thoại'
                        inputProps={{
                          name: 'phone',
                          placeholder: '0123 123 123',
                          error: touched.phone && errors.phone ? true : false,
                        }}
                        formik
                        helperText={touched.phone ? errors.phone : ''}
                      />
                      <LoadingButton variant='contained' type='submit' loading={isPending}>
                        Lưu
                      </LoadingButton>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Main>
    );
  }
  return null;
}
