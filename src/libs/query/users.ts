const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

import { StatusCode } from '../enum';
import { getStoredValue } from '../utils';

export const updatePassword = async (userId: string, data: any): Promise<{ userId: string; data: any }> => {
  return { userId, data };
};

export const updateInfo = async (request: any) => {
  const userId = getStoredValue('user_id');
  const response = await fetch(`${ENDPOINT}/users/${userId}/general-info`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, data, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const getCardByUser = async () => {
  const userId = getStoredValue('user_id');
  const response = await fetch(`${ENDPOINT}/users/${userId}/card-info`);
  const { data, statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const removeCard = async (cardId: string) => {
  const response = await fetch(`${ENDPOINT}/cards/${cardId}`, {
    method: 'DELETE',
  });
  const { statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return;
  }
  throw new Error(message);
};

export const addCard = async (request: any) => {
  const response = await fetch(`${ENDPOINT}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, data, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  } else if (statusCode === StatusCode.BADREQUEST) {
    throw new Error('Thẻ đã tồn tại');
  }
  throw new Error(message);
};

export const getProfile = async () => {
  const userId = getStoredValue('user_id');
  const response = await fetch(`${ENDPOINT}/users/${userId}`);
  const { data, statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const getUserById = async (userId: string) => {
  const response = await fetch(`${ENDPOINT}/users/${userId}`);
  const { data, statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const getDrivers = async (): Promise<any> => {
  const responseDriver = await fetch(`${ENDPOINT}/users?role=driver`);

  if (!responseDriver.ok) {
    throw new Error('Có lỗi xảy ra khi thực hiện thao tác này');
  }

  const { data: drivers } = await responseDriver.json();

  const vehicles = await Promise.all(drivers.map((driver: any) => getVehicleByDriverId(driver.id)));

  return drivers.map((driver: any, index: number) => ({
    ...driver,
    vehicle: vehicles[index],
  }));
};

export const lockDriver = async (user_id: string): Promise<{ message: string; data: any }> => {
  try {
    const response = await fetch(`${ENDPOINT}/users/${user_id}/validate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Có lỗi xảy ra khi thực hiện thao tác này');
    }

    const { data } = await response.json();
    const message = data.isValidated ? 'Mở khóa tài khoản thành công' : 'Khoá tài khoản thành công';
    return { message, data };
  } catch (error) {
    throw error;
  }
};

export const createVehicle = async (user_id: string, request: any) => {
  const response = await fetch(`${ENDPOINT}/users/${user_id}/vehicle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, data, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const getVehicleByDriverId = async (driverId: string) => {
  const response = await fetch(`${ENDPOINT}/users/${driverId}/vehicle`);
  const { data, statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};
