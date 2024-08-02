'use client';
import React, { useState } from 'react';
import styles from './GenreGather.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import GameImg from '../../img/game.png';
import LocationIco from '../../img/loc_ico.svg';
import HeartIco from '../../img/heart_ico.svg';
import HeartIcoFill from '../../img/heart_fill_ico.svg';

const GenreGather = () => {
  const [heart, setHeart] = useState<boolean>(false);

  const handleHeartChange = () => {
    setHeart(prevHeart => !prevHeart);
  };
  return (
    <div>
      <h1 className={styles.title1}>장르에 따라 달라지는 인기모임!</h1>
      <b className={styles.title2}>인기장르 모임!</b>
      <div className={styles.lineTitle}>
        <p>추리게임</p>
      </div>
      <ul className={styles.genreList}>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image src={GameImg} alt="게임이미지" />
            </span>
          </Link>
          <span className={styles.mid}>
            <span className={styles.loc}>
              <Image src={LocationIco} alt="지도 이미지" />
              장소
            </span>
            <span className={styles.heart}>
              <input
                type="checkbox"
                id="favorite1"
                onChange={handleHeartChange}
                checked={heart}
              />
              <label htmlFor="favorite1">
                <Image src={heart ? HeartIcoFill : HeartIco} alt="찜 하트" />
              </label>
            </span>
          </span>
          <Link href="/">
            <span className={styles.tag}>
              모임 제목은 최대 2줄 까지만 보이게 합니다. 모임 제목은 최대 2줄
              까지만 보이게 합니다.
            </span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image src={GameImg} alt="게임이미지" />
            </span>
          </Link>
          <span className={styles.mid}>
            <span className={styles.loc}>
              <Image src={LocationIco} alt="지도 이미지" />
              장소
            </span>
            <span className={styles.heart}>
              <input
                type="checkbox"
                id="favorite2"
                onChange={handleHeartChange}
                checked={heart}
              />
              <label htmlFor="favorite2">
                <Image src={heart ? HeartIcoFill : HeartIco} alt="찜 하트" />
              </label>
            </span>
          </span>
          <Link href="/">
            <span className={styles.tag}>
              모임 제목은 최대 2줄 까지만 보이게 합니다. 모임 제목은 최대 2줄
              까지만 보이게 합니다.
            </span>
          </Link>
        </li>
        <li>
          <Link href="/">
            <span className={styles.img}>
              <Image src={GameImg} alt="게임이미지" />
            </span>
          </Link>
          <span className={styles.mid}>
            <span className={styles.loc}>
              <Image src={LocationIco} alt="지도 이미지" />
              장소
            </span>
            <span className={styles.heart}>
              <input
                type="checkbox"
                id="favorite3"
                onChange={handleHeartChange}
                checked={heart}
              />
              <label htmlFor="favorite3">
                <Image src={heart ? HeartIcoFill : HeartIco} alt="찜 하트" />
              </label>
            </span>
          </span>
          <Link href="/">
            <span className={styles.tag}>
              모임 제목은 최대 2줄 까지만 보이게 합니다. 모임 제목은 최대 2줄
              까지만 보이게 합니다.
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default GenreGather;
