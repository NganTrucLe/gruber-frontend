'use client';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { pick } from 'lodash';

import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import EmailIcon from '@mui/icons-material/EmailRounded';

import { useToast } from '@/hooks';
import { register } from '@/libs/query';
import { InputLayout, LoadingButton, PasswordInput } from '@/libs/ui';
import { SignUpSchema } from '@/libs/validations';
import { Role } from '@/libs/enum';

interface SignUpForm {
  role: Role.PASSENGER | Role.DRIVER | Role.STAFF;
  email: string;
  password: string;
  repassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const toast = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    mutationKey: ['register'],
    onSuccess: () => {
      toast.setToast('success', 'Đăng ký thành công', 'Check email để xác thực tài khoản');
      router.push('/log-in');
    },
    onError: (error) => {
      toast.setToast('error', 'Đăng ký thất bại', error.message);
    },
  });

  const handleSubmit = (values: SignUpForm) => {
    const request = pick(values, ['email', 'password', 'role']);
    mutate(request);
  };

  return (
    <>
      <Typography variant='h5' fontWeight='bold'>
        Get Started
      </Typography>
      <Formik
        initialValues={
          {
            role: Role.PASSENGER,
            email: '',
            password: '',
          } as SignUpForm
        }
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={2}>
              <InputLayout
                label='Email'
                inputProps={{
                  name: 'email',
                  placeholder: 'Nhập địa chỉ email của bạn',
                  endAdornment: (
                    <InputAdornment position='end'>
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  error: touched.email && errors.email ? true : false,
                }}
                formik
                helperText={touched.email && errors.email ? errors.email : ''}
              />
              <InputLayout label='Mật khẩu' helperText={touched.password && errors.password ? errors.password : ''}>
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
              <InputLayout
                label='Nhập lại mật khẩu'
                helperText={touched.repassword && errors.repassword ? errors.repassword : ''}>
                <Field name='repassword'>
                  {({ field, form }: { field: any; form: any }) => {
                    const handleChange = (e: any) => {
                      form.setFieldValue(field.name, e.currentTarget.value);
                    };
                    return (
                      <PasswordInput
                        {...field}
                        value={field.value}
                        placeholder='Nhập lại mật khẩu'
                        onChange={handleChange}
                        error={touched.repassword && errors.repassword ? true : false}
                      />
                    );
                  }}
                </Field>
              </InputLayout>
              <InputLayout
                label='Bạn đăng ký dưới người dùng nào'
                helperText={touched.role && errors.role ? errors.role : ''}>
                <Field as={Select} name='role' error={touched.role && errors.role ? true : false}>
                  <MenuItem value={Role.PASSENGER}>Hành khách</MenuItem>
                  <MenuItem value={Role.DRIVER}>Tài xế</MenuItem>
                  <MenuItem value={Role.STAFF}>Nhân viên</MenuItem>
                </Field>
              </InputLayout>
              <Typography>
                Gửi xác thực cho tôi qua <b>email</b>
              </Typography>
              <LoadingButton loading={isPending} variant='contained' type='submit'>
                Tiếp theo
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  );
}
