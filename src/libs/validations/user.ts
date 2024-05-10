import * as yup from 'yup';

import { Schema } from './schema';

export const GeneralInfoSchema = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ tên'),
  phone: Schema.phone.required('Vui lòng nhập số điện thoại'),
});

export const CardInfoSchema = yup.object().shape({
  bankName: yup.string().required('Vui lòng chọn ngân hàng'),
  cardAccountNumber: yup.string().required('Vui lòng nhập số thẻ'),
  cardAccountName: yup.string().required('Vui lòng nhập tên chủ thẻ'),
  cardExpiredDate: yup.date().required('Vui lòng nhập ngày hết hạn'),
  cardCvv: yup.string().required('Vui lòng nhập mã CVV').length(3, 'Mã CVV phải có 3 chữ số'),
  phone: Schema.phone.required('Vui lòng nhập số điện thoại'),
});

export const IdentitySchema = yup.object().shape({
  type: yup.string().oneOf(['motorbike', 'car4', 'car7']).required('Vui lòng chọn loại xe'),
  plate: yup.string().required('Vui lòng nhập biển số xe'),
  description: yup.string().required('Vui lòng nhập tên mẫu xe'),
});
