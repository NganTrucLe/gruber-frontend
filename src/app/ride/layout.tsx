'use client';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { Navigation } from '@/libs/ui';
import { roleState } from '@/recoils';

export default function HomeLayout({
  children,
  driver,
  user,
}: {
  children: ReactNode;
  driver: ReactNode;
  user: ReactNode;
}) {
  const [role] = useRecoilState(roleState);

  return (
    <>
      {role == 'driver' ? driver : user}
      {role == 'passenger' ? <Navigation /> : null}
      {children}
    </>
  );
}
