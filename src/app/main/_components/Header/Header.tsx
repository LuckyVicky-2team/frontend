import React from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
const Header = () => {
  return (
    <div>
      <div className={styles.space}></div>
      <div className={styles.headerContent}>
        <h1>BOGO</h1>
        <div className={styles.right}>
          <button>
            <Image
              width={24}
              height={24}
              src={'/assets/mainImages/alarm.svg'}
              alt="알람 아이콘"
            />
            <span></span>
          </button>
          <Link href={`/`}>
            <Image
              width={24}
              height={24}
              src={'/assets/mainImages/profile.svg'}
              alt="마이페이지 아이콘"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
