// TODO: Implement the query function to get all histories and a single history by id
const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;
import histories from '@/libs/mocks/historiesAll.json';
import history from '@/libs/mocks/historySingle.json';
import { getStoredValue } from '@/libs/utils';
import { sleep } from '@/libs/utils';
import { BookingStatus, StatusCode } from '../enum';

export const getBookingHistory = async () => {
  await sleep(5000);
  return histories;
};

export const getBookingById = async (_id: string) => {
  await sleep(5000);
  return history;
};

export const updateRating = async (id: string, rating: number): Promise<{ id: string; rating: number }> => {
  await sleep(1000);
  return { id, rating };
};

export const currentRide = async () => {
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
