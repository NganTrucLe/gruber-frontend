const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;
export const login = async (request: { email: string; password: string }) => {
  const response = await fetch(`${ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });
  const { statusCode, data } = await response.json();
  if (statusCode === 200) {
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
  if (statusCode === 200) {
    return { message: 'Đăng ký thành công' };
  } else {
    throw new Error(message);
  }
};
