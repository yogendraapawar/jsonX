import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import Header from './components/Header';
import Toast  from './components/Toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          
          <div className="relative flex flex-col h-screen">
          <Toast/>
            <div>
              <Header />
            </div>
            <div className="flex-1 bg-green overflow-y-auto">{children}</div>
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
