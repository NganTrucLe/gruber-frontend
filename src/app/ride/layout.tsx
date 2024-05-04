'use client';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { roleState } from '@/recoils';
import { Navigation } from '@/libs/ui';

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
      {role == 'user' ? <Navigation /> : null}
      {children}
    </>
  );
}
