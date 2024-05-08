import { atom } from 'recoil';

import { RoleType } from '@/libs/enum';

export const roleState = atom<RoleType>({
  key: 'roleState',
  default: 'staff',
});

export interface Toast {
  open: boolean;
  severity: 'success' | 'error';
  title: string;
  message?: string;
}
export const toastState = atom<Toast>({
  key: 'toastState',
  default: {
    open: false,
    severity: 'success',
    title: '',
    message: '',
  },
});
