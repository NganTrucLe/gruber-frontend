import React, { ReactNode } from 'react';
import type { Metadata } from 'next';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import { ReactQueryProvider, RecoilProvider } from '@/libs/providers';
import { Toast } from '@/libs/ui';
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
        <RecoilProvider>
          <ReactQueryProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
                <Toast />
              </ThemeProvider>
            </AppRouterCacheProvider>
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
