const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;
import histories from '@/libs/mocks/historiesAll.json';
import history from '@/libs/mocks/historySingle.json';
import { getStoredValue } from '@/libs/utils';
import { sleep } from '@/libs/utils';
import { BookingStatus, StatusCode, Vehicle } from '@/libs/enum';

export const getBookingHistory = async () => {
  // await sleep(5000);
  return histories;
};

export const getBookingById = async (_id: string) => {
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

export const currentRides = async () => {
  await sleep(5000);

  const rows = [
    {
      id: 1,
      pick_up: 'Snow',
      payment_method: 'card',
      status: 'pending',
      vehicle_type: 'motorbike',
      destination: 'Winterfell',
    },
    {
      id: 2,
      pick_up: 'Lannister',
      payment_method: 'cash',
      status: 'picked_up',
      vehicle_type: 'car4',
      destination: 'Casterly Rock',
    },
    {
      id: 3,
      pick_up: 'Lannister',
      payment_method: 'cash',
      status: 'picked_up',
      vehicle_type: 'car7',
      destination: `King's Landing`,
    },
    {
      id: 4,
      pick_up: 'Stark',
      payment_method: 'card',
      status: 'in_progress',
      vehicle_type: 'motorbike',
      destination: 'The Wall',
    },
    {
      id: 5,
      pick_up: 'Targaryen',
      payment_method: 'card',
      status: null,
      vehicle_type: 'car4',
      destination: 'Dragonstone',
    },
    {
      id: 6,
      pick_up: 'Melisandre',
      payment_method: 'card',
      status: 'in_progress',
      vehicle_type: 'car7',
      destination: 'Asshai',
    },
    {
      id: 7,
      pick_up: 'Clifford',
      payment_method: 'card',
      status: 'pending',
      vehicle_type: 'motorbike',
      destination: 'Pawnee',
    },
    {
      id: 8,
      pick_up: 'Frances',
      payment_method: 'card',
      status: 'in_progress',
      vehicle_type: 'car4',
      destination: 'New York',
    },
    {
      id: 9,
      pick_up: 'Roxie',
      payment_method: 'card',
      status: 'picked_up',
      vehicle_type: 'car7',
      destination: 'Los Angeles',
    },
  ];
  return rows;
};

export const getVehiclePrice = async (distance: number) => {
  const response = await fetch(`${ENDPOINT}/bookings/price?distance=${distance}`);
  const { statusCode, data, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};
