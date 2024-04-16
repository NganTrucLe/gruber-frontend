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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
