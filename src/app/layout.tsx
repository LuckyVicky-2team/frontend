import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import './globals.scss';
import Header from './main/_components/Header/Header';
import Footer from './main/_components/Footer/Footer';
import { ToastProvider } from '@/contexts/toastContext';
import ToastList from '@/components/common/ToastList';
import AccessControlBoundary from '@/components/common/AccessControlBoundary';
import { ForegroundMessage } from '@/service/foregroundMessage';
import { PWAProvider } from '@/contexts/pwaContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BoardGo!',
  description: 'LuckyVicky Team project BoardGo!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/icons/logo.svg" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/icons/logo.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/assets/icons/logo.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/logo.svg"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className={inter.className}>
        <ForegroundMessage />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
          crossOrigin="anonymous"
        />
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false&libraries=services`}
          strategy="beforeInteractive"
        />
        <ToastProvider>
          <PWAProvider>
            <ToastList />
            <AccessControlBoundary>
              <Header />
              <div className="rootContainer">
                <ReactQueryProvider>{children}</ReactQueryProvider>
              </div>
              <Footer />
            </AccessControlBoundary>
          </PWAProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
