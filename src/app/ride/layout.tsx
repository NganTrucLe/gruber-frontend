'use client';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { roleState } from '@/recoils';
export default function HomeLayout({ children, driver }: { children: ReactNode; driver: ReactNode }) {
  const [role] = useRecoilState(roleState);

  return (
    <>
      {role == 'driver' ? driver : null}
      {children}
    </>
  );
}
