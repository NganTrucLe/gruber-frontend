'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EmailIcon from '@mui/icons-material/EmailRounded';

import { useLocalStorage, useToast } from '@/hooks';
import { login } from '@/libs/query';
import { colors, InputLayout, LoadingButton, PasswordInput } from '@/libs/ui';
import { LoginSchema } from '@/libs/validations';

export default function LogIn() {
  const router = useRouter();
  const [form, setForm] = useState(false);
  const localStorage = useLocalStorage();
  const { setToast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (request: { email: string; password: string }) => login(request),
    mutationKey: ['login'],
    onSuccess: ({ data }) => {
      localStorage.setStoredValue('idToken', data.idToken);
      localStorage.setStoredValue('user_id', data.id);
      setToast('success', 'Đăng nhập thành công');
      router.push('/');
    },
    onError: (error) => {
      setToast('error', `Đăng nhập thất bại`, error.message);
    },
  });
  return (
    <>
      <Typography variant='h6' fontWeight='bold'>
        Your everyday everything app
      </Typography>
      <Stack spacing={2}>
        {!form ? (
          <>
            <Button variant='secondary' size='large'>
              Tiếp tục với Facebook
            </Button>
            <Button variant='secondary' size='large'>
              Tiếp tục với Google
            </Button>
            <Divider>
              <Typography sx={{ color: colors.neutral[200] }}>or</Typography>
            </Divider>
            <Button variant='secondary' size='large' startIcon={<EmailIcon />} onClick={() => setForm(true)}>
              Tiếp tục với Email
            </Button>
          </>
        ) : (
          <>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={mutate}>
              {({ errors, touched }) => {
                return (
                  <Form>
                    <Stack spacing={2}>
                      <InputLayout
                        label='Email'
                        formik
                        inputProps={{
                          name: 'email',
                          placeholder: 'Địa chỉ email đã đăng ký',
                          error: touched.email && errors.email ? true : false,
                        }}
                        helperText={touched.email ? errors.email : ''}
                      />
                      <InputLayout label='Mật khẩu' helperText={touched.password ? errors.password : ''}>
                        <Field name='password'>
                          {({ field, form }: { field: any; form: any }) => {
                            const handleChange = (e: any) => {
                              form.setFieldValue(field.name, e.currentTarget.value);
                            };
                            return (
                              <PasswordInput
                                {...field}
                                value={field.value}
                                placeholder='Nhập mật khẩu'
                                onChange={handleChange}
                                error={touched.password && errors.password ? true : false}
                              />
                            );
                          }}
                        </Field>
                      </InputLayout>
                      <LoadingButton loading={isPending} variant='contained' type='submit'>
                        Đăng nhập
                      </LoadingButton>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </Stack>
    </>
  );
}
