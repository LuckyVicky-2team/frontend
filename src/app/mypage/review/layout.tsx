'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Layout.module.scss';

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>보고</h1>
        <div className={styles.commonLayout}>
          <h2>리뷰 내역</h2>
        </div>
      </header>

      <section>
        {/* @haewon 버튼 디자인 적용안되어있음 */}
        <nav className={styles.tabHeader}>
          <Link
            href="/mypage/review"
            className={`${pathname === '/mypage/review' && styles.active}`}>
            리뷰 작성하기
          </Link>
          <Link
            href="/mypage/review/myReviews"
            className={`${pathname === '/mypage/review/myReviews' && styles.active}`}>
            내가 쓴 리뷰
          </Link>
          <Link
            href="/mypage/review/receivedReviews"
            className={`${pathname === '/mypage/review/receivedReviews' && styles.active}`}>
            나에게 달린 리뷰
          </Link>
        </nav>

        <main className={styles.reviewContainer}>{children}</main>
      </section>
    </div>
  );
}
