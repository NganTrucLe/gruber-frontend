const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;
import { doGet, doPatch } from './methods';
import { getStoredValue } from '@/libs/utils';
import { sleep } from '@/libs/utils';
import { BookingStatus, StatusCode, Vehicle } from '@/libs/enum';

export const getBookingHistory = async () => {
  const userId = getStoredValue('user_id');
  return await doGet(`/users/${userId}/bookings`);
};

export const getBookingById = async (_id: string) => {
  const userId = getStoredValue('user_id');
  return await doGet(`/users/${userId}/bookings/${_id}`);
};

export const updateRating = async (id: string, rating: number): Promise<{ id: string; rating: number }> => {
  await sleep(1000);
  return { id, rating };
};

export const currentBookingOfUser = async () => {
  const user_id = getStoredValue('user_id');
  const response = await fetch(`${ENDPOINT}/users/${user_id}/current-booking`);
  const { data, statusCode, message } = await response.json();
  if (statusCode == StatusCode.SUCCESS) {
    if (data) {
      // Refactor data;
      return data;
    } else throw new Error('Không có cuốc xe nào hiện tại');
  } else throw new Error(message);
};

export const bookingDetail = async (booking_id: string) => {
  return doGet(`/bookings/${booking_id}`);
};

export const bookARide = async (values: any) => {
  const request = {
    ...values,
    user_id: getStoredValue('user_id'),
  };
  const response = await fetch(`${ENDPOINT}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getStoredValue('idToken')}`,
    },
    body: JSON.stringify(request),
  });
  const { statusCode, data, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return { data, message };
  } else throw new Error('Đặt xe không thành công, vui lòng thử lại sau');
};

export const createARide = async (data: {
  name: string;
  phone: string;
  vehicle_type: Vehicle;
  driver_id: string;
  booking_route: {
    pick_up: string;
    destination: string;
  };
}) => {
  console.log(getStoredValue('id'));
  const request = {
    ...data,
    user_id: getStoredValue('user_id'),
  };
  const response = await fetch(`${ENDPOINT}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getStoredValue('idToken')}`,
    },
    body: JSON.stringify(request),
  });
  const { statusCode } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return { message: 'Tạo chuyến đi thành công' };
  } else throw new Error('Tạo chuyến đi không thành công');
};

export const updateRideStatus = async (booking_id: string, status: BookingStatus) => {
  const request = {
    updated_by_id: getStoredValue('user_id'),
    status,
  };
  const response = await fetch(`${ENDPOINT}/bookings/${booking_id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, message, data } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const currentBookings = async () => {
  return await doGet(`/bookings?current=true`);
};

export const allBookings = async () => {
  return await doGet('/bookings?current=false');
};

export const getVehiclePrice = async (distance: number) => {
  return await doGet(`/bookings/price?distance=${distance}`);
};

export const assignDriverToBooking = async (booking_id: string, driver_id: string) => {
  const user_id = getStoredValue('user_id');
  const request = {
    driver_id,
    updated_by_id: user_id,
  };
  const { data, message, statusCode } = await doPatch(`/bookings/${booking_id}/driver`, request);
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};
