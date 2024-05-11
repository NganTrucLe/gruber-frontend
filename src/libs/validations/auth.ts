import * as yup from 'yup';

import { Schema } from './schema';
import { Role } from '../enum';

export const SignUpSchema = yup.object().shape({
  email: Schema.email,
  password: Schema.password,
  repassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
  role: yup
    .string()
    .oneOf([Role.DRIVER, Role.PASSENGER, Role.STAFF], 'Vui lòng chọn hành khách, tài xế hoặc nhân viên')
    .required('Vui lòng chọn vai trò'),
});

export const LoginSchema = yup.object().shape({
  email: Schema.email,
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

export const ForgetPasswordSchema = yup.object().shape({
  // currentPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
  password: Schema.password,
  repassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp'),
});
