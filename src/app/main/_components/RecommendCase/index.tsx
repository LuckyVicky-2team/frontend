'use client';
import React from 'react';
import styles from './RecommendCase.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import ReImg1 from '../../img/re1.png';
import ReImg2 from '../../img/re2.png';
import ReImg3 from '../../img/re3.png';
import ReImg4 from '../../img/re4.png';

const RecommendCase = () => {
  return (
    <div>
      <h1 className={styles.title}>주어진 환경은 다르니까!</h1>
      <b className={styles.title2}>상황별 추천!</b>
      <ul className={styles.recommendList}>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image src={ReImg1} alt="1" />
            </span>
            <span className={styles.tag}>2인 게임</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image src={ReImg2} alt="1" />
            </span>
            <span className={styles.tag}>3인 게임</span>
          </Link>
        </li>
        <li>
          <span className={styles.bubble}>
            <span className={styles.font}>인기</span>
          </span>
          <Link href="/">
            <span className={styles.img}>
              <Image src={ReImg3} alt="1" />
            </span>
            <span className={styles.tag}>다인원</span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image src={ReImg4} alt="1" />
            </span>
            <span className={styles.tag}>장르별</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default RecommendCase;
