'use client';
import React, { useState } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import FooterMenu1 from '../../img/f1.svg';
import FooterMenu2 from '../../img/f2.svg';
import FooterMenu3 from '../../img/f3.svg';
import FooterMenu4 from '../../img/f4.svg';
import FooterMenu5 from '../../img/f5.svg';
import Link from 'next/link';
const Footer = () => {
  const [on, setOn] = useState(3);

  const handleOn = (index: any) => {
    setOn(index);
  };

  return (
    <div>
      <div className={styles.space}></div>
      <div className={styles.footerContent}>
        <ul>
          <li
            onClick={() => {
              handleOn(1);
            }}
            className={on === 1 ? styles.on : ''}>
            {/* <Link href="/"> */}
            <span className={styles.a}>
              <span className={styles.ico}>
                <Image src={FooterMenu1} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>채팅방</span>
            </span>
            {/* </Link> */}
          </li>
          <li
            onClick={() => {
              handleOn(2);
            }}
            className={on === 2 ? styles.on : ''}>
            {/* <Link href="/"> */}
            <span className={styles.a}>
              <span className={styles.ico}>
                <Image src={FooterMenu2} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>내모임</span>
            </span>
            {/* </Link> */}
          </li>
          <li
            onClick={() => {
              handleOn(3);
            }}
            className={on === 3 ? styles.on : ''}>
            <Link href="/main">
              <span className={styles.a}>
                <span className={styles.ico}>
                  <Image src={FooterMenu3} alt="푸터메뉴1" />
                </span>
                <span className={styles.tag}>홈</span>
              </span>
            </Link>
          </li>
          <li
            onClick={() => {
              handleOn(4);
            }}
            className={on === 4 ? styles.on : ''}>
            {/* <Link href="/"> */}
            <span className={styles.a}>
              <span className={styles.ico}>
                <Image src={FooterMenu4} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>모임목록</span>
            </span>
            {/* </Link> */}
          </li>
          <li
            onClick={() => {
              handleOn(5);
            }}
            className={on === 5 ? styles.on : ''}>
            <Link href="/signin">
              <span className={styles.a}>
                <span className={styles.ico}>
                  <Image src={FooterMenu5} alt="푸터메뉴1" />
                </span>
                <span className={styles.tag}>내정보</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
