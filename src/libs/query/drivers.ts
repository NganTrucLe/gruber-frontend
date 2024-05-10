import { WalletType } from '../enum';
import { getStoredValue } from '../utils';
import { doGet, doPost } from './methods';

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
