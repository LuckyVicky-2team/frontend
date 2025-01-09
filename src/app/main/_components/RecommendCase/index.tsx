'use client';
import React from 'react';
import styles from './RecommendCase.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export default function RecommendCase() {
  return (
    <div>
      <h1 className={styles.title}>주어진 환경은 다르니까!</h1>
      <b className={styles.title2}>상황별 추천!</b>
      <ul className={styles.recommendList}>
        <li>
          <Link href="/recommend/two">
            <span className={styles.img}>
              <Image
                width={222}
                height={222}
                src={'/assets/mainImages/re1_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>2인 게임</span>
          </Link>
        </li>
        <li>
          <Link href="/recommend/three">
            <span className={styles.img}>
              <Image
                width={122}
                height={122}
                src={'/assets/mainImages/re2_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>3인 게임</span>
          </Link>
        </li>
        <li>
          <span className={styles.bubble}>
            <span className={styles.font}>인기</span>
          </span>
          <Link href="/recommend/many">
            <span className={styles.img}>
              <Image
                width={122}
                height={122}
                src={'/assets/mainImages/re3_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>다인원</span>
          </Link>
        </li>
        <li>
          <Link href="/recommend/all">
            <span className={styles.img}>
              <Image
                width={122}
                height={122}
                src={'/assets/mainImages/re4_1.png'}
                alt="1"
              />
            </span>
            <span className={styles.tag}>전체게임</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
