// const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

import { sleep } from '@/libs/utils';
import { Vehicle } from '../enum';
// import { useLocalStorage } from '@/hooks';

export const createRideFromStaffFull = async (request: {
  name: string;
  phone: string;
  vehicle_type: Vehicle;
  booking_route: {
    pick_up: number;
    destination: number;
  };
}) => {
  // const { getStoredValue: idToken } = useLocalStorage('idToken');
  // const response = await fetch(`${ENDPOINT}/rides`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${idToken}`,
  //     },
  //     body: JSON.stringify(data),
  // });
  // const { statusCode } = await response.json();
  await sleep(5000);
  const { statusCode } = { statusCode: 200 };
  console.log(request);
  if (statusCode === 200) {
    return { message: 'Tạo chuyến đi thành công' };
  } else {
    return { message: 'Tạo chuyến đi không thành công' };
  }
};

export const createRideFromStaffHalf = async (request: {
  name: string;
  phone: string;
  vehicle_type: Vehicle;
  booking_route: {
    pick_up: number | string;
    destination: number | string;
  };
}) => {
  // const response = await fetch(`${ENDPOINT}/rides`, {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  // });
  // const { statusCode } = await response.json();
  await sleep(5000);
  const { statusCode } = { statusCode: 200 };
  console.log(request);
  if (statusCode === 200) {
    return { message: 'Tạo chuyến đi thành công' };
  } else {
    return { message: 'Tạo chuyến đi không thành công' };
  }
};
