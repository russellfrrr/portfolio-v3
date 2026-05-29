import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'russellfrrr | portfolio',
  description: 'work in progress.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning className={cn('font-sans', geist.variable)}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
