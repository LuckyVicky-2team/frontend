import React from 'react';
import styles from './MainNav.module.scss';
import Image from 'next/image';

const MainNav = () => {
  return (
    <div className={styles.mainNav}>
      <div className={styles.mainNavContent}>
        <div>
          <h2>마감임박</h2>
          <p>
            곧! 모집이
            <br />
            마감됩니다!
          </p>
        </div>
        <Image
          width={111}
          height={111}
          src={'/assets/mainImages/time.png'}
          alt="마감임박 네비메뉴 이미지"
        />
      </div>
      <div className={styles.mainNavContent}>
        <div>
          <h2>인기모임</h2>
          <p>
            그 모임
            <br />
            지금 핫해요!
          </p>
        </div>
        <Image
          width={111}
          height={111}
          src={'/assets/mainImages/fire.png'}
          alt="인기모임 네비메뉴 이미지"
        />
      </div>
    </div>
  );
};

export default MainNav;
