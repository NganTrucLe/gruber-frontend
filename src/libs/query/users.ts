export const updatePassword = async (userId: string, data: any): Promise<{ userId: string; data: any }> => {
  return { userId, data };
};

export const updateInfo = async (userId: string, data: any): Promise<{ userId: string; data: any }> => {
  return { userId, data };
};

export const removeCard = async (userId: string): Promise<{ userId: string }> => {
  return { userId };
};

export const addCard = async (userId: string, data: any): Promise<{ userId: string; data: any }> => {
  return { userId, data };
};
