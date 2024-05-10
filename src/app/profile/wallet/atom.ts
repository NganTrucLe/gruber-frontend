import { WalletType } from '@/libs/enum';
import { atom } from 'recoil';

export const WalletState = atom<WalletType>({
  key: 'WalletState',
  default: WalletType.CASH,
});
