'use client';
import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';

import { Role } from '@/libs/enum';
import { roleState } from '@/recoils';
export default function HomeLayout({
  children,
  admin,
  driver,
  staff,
  user,
}: {
  children: ReactNode;
  admin?: ReactNode;
  driver?: ReactNode;
  staff?: ReactNode;
  user?: ReactNode;
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
    case 'admin' as Role:
      roleComponent = admin;
      break;
    default:
      roleComponent = staff;
  }

  return (
    <>
      {roleComponent}
      {children}
    </>
  );
}
