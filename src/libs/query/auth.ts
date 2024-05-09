import { StatusCode } from '../enum';

const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

export const verifyToken = async (token: string) => {
  const response = await fetch(`${ENDPOINT}/auth/verify-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  const { statusCode, data, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    if (typeof data === 'string') {
      return data;
    } else {
      const { statusCode: newStatusCode, message: newMessage } = data.response;
      throw new Error(`${newStatusCode}: ${newMessage}`);
    }
  } else {
    throw new Error(message);
  }
};

export const login = async (request: { email: string; password: string }) => {
  const response = await fetch(`${ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, data } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return { message: 'Đăng nhập thành công', data };
  } else {
    throw new Error('Email hoặc mật khẩu không đúng');
  }
};

export const register = async (request: { email: string; password: string; role: string }) => {
  const response = await fetch(`${ENDPOINT}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, message } = await response.json();
  if (statusCode === StatusCode.SUCCESS) {
    return { message: 'Đăng ký thành công' };
  } else {
    throw new Error(message);
  }
};
