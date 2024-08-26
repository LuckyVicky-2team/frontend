'use client';

import React from 'react';
import styles from './Layout.module.scss';
import NavLink from './_components/NavLink';
import { usePathname } from 'next/navigation';

const navLinks = [
  {
    href: '/mypage/review',
    label: '리뷰 작성하기',
  },
  { href: '/mypage/review/myReviews', label: '보낸 리뷰' },
  { href: '/mypage/review/receivedReviews', label: '받은 리뷰' },
];

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // pathname에 number 혹은 'reviewee' 문자열이 포함된 경우 확인
  const writeReviewRoute = /^\/mypage\/review\/\d+\/reviewee-/.test(pathname);
  const writeReviewDetailRoute = /^\/mypage\/review\/\d+$/.test(pathname);

  return (
    <div className={styles.container}>
      {writeReviewRoute || writeReviewDetailRoute ? (
        <main>{children}</main>
      ) : (
        <>
          <header className={styles.header}>
            <h1>보고</h1>
            <h2>리뷰</h2>
          </header>
          <section>
            <nav className={styles.tabHeader}>
              {navLinks.map(link => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
            <main className={styles.reviewContainer}>{children}</main>
          </section>
        </>
      )}
    </div>
  );
}