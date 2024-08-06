'use client';
import React, { useState } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
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
                {on === 1 ? (
                  <Image
                    width={24}
                    height={24}
                    src={'/assets/mainImages/f1_fill.svg'}
                    alt="푸터메뉴1"
                  />
                ) : (
                  <Image
                    width={24}
                    height={24}
                    src={'/assets/mainImages/f3.svg'}
                    alt="푸터메뉴1"
                  />
                )}
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
                {on === 2 ? (
                  <Image
                    width={24}
                    height={24}
                    src={'/assets/mainImages/f2_fill.svg'}
                    alt="푸터메뉴1"
                  />
                ) : (
                  <Image
                    width={24}
                    height={24}
                    src={'/assets/mainImages/f2.svg'}
                    alt="푸터메뉴1"
                  />
                )}
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
                  {on === 3 ? (
                    <Image
                      width={24}
                      height={24}
                      src={'/assets/mainImages/f1_fill.svg'}
                      alt="푸터메뉴1"
                    />
                  ) : (
                    <Image
                      width={24}
                      height={24}
                      src={'/assets/mainImages/f3.svg'}
                      alt="푸터메뉴1"
                    />
                  )}
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
                {on === 4 ? (
                  <Image
                    width={24}
                    height={24}
                    src={'/assets/mainImages/f4_fill.svg'}
                    alt="푸터메뉴1"
                  />
                ) : (
                  <Image
                    width={24}
                    height={24}
                    src={'/assets/mainImages/f4.svg'}
                    alt="푸터메뉴1"
                  />
                )}
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
                  {on === 5 ? (
                    <Image
                      width={24}
                      height={24}
                      src={'/assets/mainImages/f5_fill.svg'}
                      alt="푸터메뉴1"
                    />
                  ) : (
                    <Image
                      width={24}
                      height={24}
                      src={'/assets/mainImages/smile.svg'}
                      alt="푸터메뉴1"
                    />
                  )}
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
