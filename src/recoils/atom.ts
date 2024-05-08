import { atom } from 'recoil';

export type RoleType = 'staff' | 'driver' | 'user' | 'admin';

export const roleState = atom<RoleType>({
  key: 'roleState',
  default: 'staff',
});
