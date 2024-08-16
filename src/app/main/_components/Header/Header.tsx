'use client';
import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const router = useRouter();

  //현재 pathname
  const currentPathName = pathName.split('/')[1];

  return (
    <header>
      {currentPathName === 'mypage' ? (
        <div className={styles.customHeader}>
          <div className={styles.space}></div>
          <div className={styles.headerContent}>
            <p>
              <button
                type={'button'}
                onClick={() => {
                  router.back();
                }}>
                <span>
                  <Image
                    width={16}
                    height={16}
                    objectFit="cover"
                    src={'/assets/mainImages/backIcon.svg'}
                    alt="뒤로가기 아이콘"
                  />
                </span>
              </button>
              마이페이지
            </p>
            <div className={styles.right}>
              <h2>
                <Link href="/">BOGO</Link>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        // default 기본 헤더
        <div>
          <div className={styles.space}></div>
          <div className={styles.headerContent}>
            <h1>
              <Link href="/main">BOGO</Link>
            </h1>
            <div className={styles.right}>
              <button>
                <Image
                  width={56}
                  height={56}
                  src={'/assets/mainImages/alarm.svg'}
                  alt="알람 아이콘"
                />
                <span></span>
              </button>
              <Link href={`/mypage`}>
                <Image
                  width={32}
                  height={32}
                  src={'/assets/mainImages/profile.svg'}
                  alt="마이페이지 아이콘"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
