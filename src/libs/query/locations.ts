const ENDPOINT = process.env.NEXT_PUBLIC_NAME_API_ENDPOINT;

export const getAllLocations = async () => {
  const response = await fetch(`${ENDPOINT}/locations`);
  const { statusCode, data } = await response.json();
  if (statusCode === 200) {
    return data;
  } else {
    return [];
  }
};

export const searchLocations = async (search: string) => {
  const encodedSearch = encodeURIComponent(search);
  const response = await fetch(`${ENDPOINT}/locations/search?key=${encodedSearch}`);
  const { statusCode, data } = await response.json();
  if (statusCode === 200) {
    return data;
  } else {
    return [];
  }
};

export const createLocation = async (req: { name: string; formattedAddress: string; lat: number; lng: number }) => {
  const response = await fetch(`${ENDPOINT}/locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
  const { statusCode, data } = await response.json();
  if (statusCode === 200) {
    return { data };
  } else {
    return { message: 'Tạo địa điểm không thành công' };
  }
};
