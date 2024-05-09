import * as yup from 'yup';

import { Schema } from './schema';

export const GeneralInfo = yup.object().shape({
  fullName: yup.string().required('Vui lòng nhập họ tên'),
  phone: Schema.phone.required('Vui lòng nhập số điện thoại'),
});
