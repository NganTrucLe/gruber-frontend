// TODO: Implement the query function to get all histories and a single history by id
const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;
import histories from '@/libs/mocks/historiesAll.json';
import history from '@/libs/mocks/historySingle.json';
import rideDriver from '@/libs/mocks/rideDriver.json';
import rideUser from '@/libs/mocks/rideUser.json';
import { getStoredValue } from '@/libs/utils';
import { sleep } from '@/libs/utils';

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

export const currentRideUser = async () => {
  await sleep(1000);
  return rideUser;
};

export const currentRideDriver = async () => {
  await sleep(1000);
  return rideDriver;
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
  if (statusCode === 200) {
    return { data, message };
  } else throw new Error('Đặt xe không thành công, vui lòng thử lại sau');
};

export const cancelRide = async (id: number): Promise<{ id: number }> => {
  await sleep(5000);
  return { id };
};

export const updateRideStatus = async (id: string, status: string): Promise<{ id: string; status: string }> => {
  await sleep(1000);
  return { id, status };
};
