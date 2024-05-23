import { StatusCode } from '../enum';
import { getStoredValue } from '../utils';

const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

export const doGet = async (url: string) => {
  const idToken = getStoredValue('id_token');
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const { data, statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const doPost = async (url: string, request: any) => {
  const idToken = getStoredValue('id_token');
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { data, statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return data;
  }
  throw new Error(message);
};

export const doPatch = async (url: string, request: any) => {
  const idToken = getStoredValue('id_token');
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error('Có lỗi xảy ra khi thực hiện thao tác này');
  }
  return response.json();
};

export const doDelete = async (url: string) => {
  const idToken = getStoredValue('id_token');
  const response = await fetch(`${ENDPOINT}${url}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const { statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return;
  }
  throw new Error(message);
};
