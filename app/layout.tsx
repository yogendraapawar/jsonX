import type { Metadata } from 'next';
import { Atkinson_Hyperlegible, Roboto } from 'next/font/google';
import './globals.css';
import ReduxProvider from '@/redux/ReduxProvider';
import Header from './components/Header';
import Toast from './components/Toast';
import { Analytics } from "@vercel/analytics/next"
import ThemeProvider from './utils/ThemeProvider';
const atkinson = Atkinson_Hyperlegible({
    weight: ['400'],
    subsets: ['latin'],
    preload: true,
});
export const metadata: Metadata = {
    title: 'JSONX - JSON Utility Tool',
    description:
        'JSONX is a versatile JSON tool that helps you generate paths for keys, parse JSON strings, and format JSON online.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <html lang="en">
                <head>
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9532409450964821" crossOrigin='anonymous'></script>
                </head>
                <body className={atkinson.className}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                    >
                        <div className="relative flex flex-col h-screen">
                            <Toast />
                            <div>
                                <Header />
                            </div>
                            <div className="flex-1 bg-green overflow-y-auto">
                                {children}
                            </div>
                        </div>
                        <Analytics />
                    </ThemeProvider>
                </body>
            </html>
        </ReduxProvider>
    );
}
