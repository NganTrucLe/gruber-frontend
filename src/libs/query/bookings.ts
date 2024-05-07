// TODO: Implement the query function to get all histories and a single history by id
import histories from '@/libs/mocks/historiesAll.json';
import history from '@/libs/mocks/historySingle.json';
import rideDriver from '@/libs/mocks/rideDriver.json';
import rideUser from '@/libs/mocks/rideUser.json';

export const getBookingHistory = async () => {
  return histories;
};

export const getBookingById = async (_id: string) => {
  return history;
};

export const updateRating = async (id: string, rating: number): Promise<{ id: string; rating: number }> => {
  return { id, rating };
};

export const currentRideUser = async () => {
  return rideUser;
};

export const currentRideDriver = async () => {
  return rideDriver;
};

export const bookARide = async (data: any) => {
  alert(data);
};

export const cancelRide = async (id: number): Promise<{ id: number }> => {
  return { id };
};

export const updateRideStatus = async (id: string, status: string): Promise<{ id: string; status: string }> => {
  return { id, status };
};
