'use client';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { Role } from '@/libs/enum';
import { Navigation } from '@/libs/ui';
import { roleState } from '@/recoils';

export default function HistoriesLayout({
  children,
  driver,
  user,
}: {
  children: ReactNode;
  driver: ReactNode;
  user: ReactNode;
}) {
  const [role] = useRecoilState(roleState);
  let roleComponent;

  switch (role) {
    case 'user' as Role:
      roleComponent = user;
      break;
    case 'driver' as Role:
      roleComponent = driver;
      break;
  }

  return (
    <>
      {roleComponent}
      {role == 'user' ? <Navigation /> : null}
      {children}
    </>
  );
}
