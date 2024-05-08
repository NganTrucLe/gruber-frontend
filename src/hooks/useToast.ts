'use client';
import { useSetRecoilState } from 'recoil';

import { toastState } from '@/recoils';

export default function useToast() {
  const setToastState = useSetRecoilState(toastState);
  const setToast = (severity: 'success' | 'error', title: string, message?: string) => {
    setToastState({
      open: true,
      severity,
      title,
      message,
    });
  };

  return { setToast };
}
