'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { InputLayout, Main, PasswordInput, TopAppBar } from '@/libs/ui';
import { updatePassword } from '@/libs/query';

export default function ChangePasswordPage() {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (data: { userId: string; data: any }) => updatePassword(data.userId, data.data),
    onSuccess: () => {
      router.push('/profile');
      // show success message
      alert('Đổi mật khẩu thành công');
    },
    onError: (error) => {
      // show error message
      alert('Đổi mật khẩu thất bại ' + error.message);
    },
  });

  return (
    <Main>
      <TopAppBar title='Đổi mật khẩu' backHref='/profile' />
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
          <Formik
            initialValues={{
              current_password: '',
              new_password: '',
              confirm_password: '',
            }}
            onSubmit={(values) => {
              mutate({ userId: '1', data: values });
            }}>
            <Form>
              <Stack spacing={2}>
                <InputLayout label='Mật khẩu hiện tại' required>
                  <Field name='current_password'>
                    {({ field, form }: { field: any; form: any }) => {
                      const handleChange = (e: any) => {
                        form.setFieldValue(field.name, e.currentTarget.value);
                      };
                      return <PasswordInput {...field} value={field.value} onChange={handleChange} />;
                    }}
                  </Field>
                </InputLayout>
                <InputLayout label='Mật khẩu mới' required>
                  <Field name='new_password'>
                    {({ field, form }: { field: any; form: any }) => {
                      const handleChange = (e: any) => {
                        form.setFieldValue(field.name, e.currentTarget.value);
                      };
                      return <PasswordInput {...field} value={field.value} onChange={handleChange} />;
                    }}
                  </Field>
                </InputLayout>
                <InputLayout label='Nhập lại mật khẩu' required>
                  <Field name='confirm_password'>
                    {({ field, form }: { field: any; form: any }) => {
                      const handleChange = (e: any) => {
                        form.setFieldValue(field.name, e.currentTarget.value);
                      };
                      return <PasswordInput {...field} value={field.value} onChange={handleChange} />;
                    }}
                  </Field>
                </InputLayout>
                <Button variant='contained' type='submit'>
                  Lưu
                </Button>
              </Stack>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Main>
  );
}
