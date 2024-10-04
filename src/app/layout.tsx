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
    <html lang="ko">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
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
          <ToastList />
          <AccessControlBoundary>
            <Header />
            <div className="rootContainer">
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </div>
            <Footer />
          </AccessControlBoundary>
        </ToastProvider>
      </body>
    </html>
  );
}
