import type { Metadata } from 'next';
import { Atkinson_Hyperlegible, Inter, Roboto } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import Header from './components/Header';
import Toast  from './components/Toast';
import LoadingPage from './components/LoadingPage';

const inter = Roboto({weight:['400'], subsets:['latin'] });
const atkinson = Atkinson_Hyperlegible({
  weight: ['400'],
  subsets: ['latin'], // Add the desired subset(s) here
  preload: true,     // This ensures the font is preloaded
});
export const metadata: Metadata = {
  title: 'JSONX - JSON Utility Tool',
  description: 'JSONX is a versatile JSON tool that helps you generate paths for keys, parse JSON strings, and format JSON online.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={atkinson.className}>
          
          <div className="relative flex flex-col h-screen">
          <Toast/>
            <div>
              {/* <Header /> */}
            </div>
            <div className="flex-1 bg-green overflow-y-auto">{children}</div>
          </div>
        </body>
      </html>
    </ReduxProvider>
  );
}
