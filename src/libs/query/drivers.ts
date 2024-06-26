import { WalletType } from '../enum';
import { getStoredValue } from '../utils';
import { doGet, doPatch, doPost } from './methods';
import _ from 'lodash';

export const getDrivers = async (): Promise<any> => {
  return await doGet(`/users?role=driver`);
};

export const getOnlineDrivers = async (): Promise<any> => {
  const data = await getDrivers();
  return data.map((driver: any) => {
    return {
      ...driver,
      location: {
        lat: _.random(10.762, 10.7629, true),
        lng: _.random(106.682, 106.6829, true),
      },
    };
  });
};

export const getWalletsByDriverId = async () => {
  const driverId = getStoredValue('user_id');
  return await doGet(`/users/${driverId}/wallets`);
};

export const withdraw = async (wallet: WalletType, amount: number) => {
  const driverId = getStoredValue('user_id');
  return await doPost(`/users/${driverId}/wallets`, {
    amount,
    wallet,
    transaction_type: 'withdraw',
  });
};

export const deposit = async (amount: number) => {
  const driverId = getStoredValue('user_id');
  return await doPost(`/users/${driverId}/wallets`, {
    amount,
    wallet: WalletType.CREDIT,
    transaction_type: 'deposit',
  });
};

export const lockDriver = async (user_id: string): Promise<{ message: string; data: any }> => {
  try {
    const response = await doPatch(`/users/${user_id}/validate`, {});
    const { data } = response;
    const message = data.isValidated ? 'Mở khóa tài khoản thành công' : 'Khoá tài khoản thành công';
    return { message, data };
  } catch (error) {
    throw error;
  }
};

export const getVehicleByDriverId = async (driverId: string) => {
  return await doGet(`/users/${driverId}/vehicle`);
};

export const createVehicle = async (user_id: string, request: any) => {
  return await doPost(`/users/${user_id}/vehicle`, request);
};
