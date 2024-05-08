import * as yup from 'yup';

import { Schema } from './schema';

export const RideFromStaffSchema = yup.object().shape({
  name: yup.string().required('Tên khách hàng không được để trống'),
  phone: Schema.phone.required('Số điện thoại không được để trống'),
  vehicle_type: yup.string().required('Loại xe không được để trống').oneOf(['motorbike', 'car4', 'car7']),
});

export const NewLocationRecordSchema = yup.object().shape({
  formattedAddress: yup.string().required('Địa chỉ không được để trống'),
});
