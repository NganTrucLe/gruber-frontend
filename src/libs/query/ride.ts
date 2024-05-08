const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

import { getStoredValue, sleep } from '@/libs/utils';
import { Vehicle } from '../enum';

export const createRideFromStaffFull = async (data: {
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
  if (statusCode === 200) {
    return { message: 'Tạo chuyến đi thành công' };
  } else throw new Error('Tạo chuyến đi không thành công');
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
