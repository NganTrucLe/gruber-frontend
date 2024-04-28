import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { ReactQueryProvider } from '@/libs/providers';
import theme from '@/libs/ui/theme';

export const metadata: Metadata = {
  title: 'Gruber',
  description: 'Grab and Uber in one place',
};

type Role = 'user' | 'driver' | 'admin' | 'staff';
export default function RootLayout({
  children,
  user,
  driver,
  admin,
  staff,
}: Readonly<{
  children: ReactNode;
  user: ReactNode;
  driver: ReactNode;
  admin: ReactNode;
  staff: ReactNode;
}>) {
  const role: Role = 'driver';

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
    <html lang='en'>
      <body>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {roleComponent}
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
