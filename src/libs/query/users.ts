import { StatusCode } from '../enum';
import { getStoredValue } from '../utils';

const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

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

export const removeCard = async (userId: string): Promise<{ userId: string }> => {
  return { userId };
};

export const addCard = async (userId: string, data: any): Promise<{ userId: string; data: any }> => {
  return { userId, data };
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
