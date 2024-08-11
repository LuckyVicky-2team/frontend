import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
export default function Header() {
  return (
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
          <Link href={`/mypage/1`}>
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
  );
}
