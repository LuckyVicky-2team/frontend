'use client';
import React, { useEffect, useState } from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const [on, setOn] = useState(3);
  const pathName = usePathname();
  const currentPathName = pathName.split('/')[1];
  const currentPathName2 = pathName.split('/')[2];

  useEffect(() => {
    if (currentPathName === 'main') {
      setOn(3);
    } else if (
      currentPathName === 'mypage' &&
      currentPathName2 === 'myGatherings'
    ) {
      setOn(2);
    } else if (currentPathName === 'mypage') {
      setOn(5);
    } else if (currentPathName === '') {
      setOn(0);
    } else if (currentPathName === 'gatherings') {
      setOn(4);
    } else {
      setOn(999);
    }
  }, [pathName]);

  const handleOn = (index: any) => {
    setOn(index);
  };

  return (
    <footer>
      {currentPathName === 'gatherings' && currentPathName2 ? (
        <div className={styles.customFooter}>
          <div className={styles.space}></div>
          <div className={styles.footerContent}>
            <button type={'button'} className={styles.joinBtn}>
              모임 참여하기
            </button>
          </div>
        </div>
      ) : pathName.startsWith('/signup') ? (
        <div className={styles.customFooter} style={{ display: 'none' }}>
          <div className={styles.space}></div>
          <div className={styles.footerContent}>
            <button type={'button'} className={styles.joinBtn}>
              모임 참여하기
            </button>
          </div>
        </div>
      ) : pathName.startsWith('/threads') ? (
        <div className={styles.customFooter} style={{ display: 'none' }}>
          <div className={styles.space}></div>
          <div className={styles.footerContent}>
            <button type={'button'} className={styles.joinBtn}>
              모임 참여하기
            </button>
          </div>
        </div>
      ) : (
        //기본 푸터
        <div>
          <div className={styles.space}></div>
          <div className={styles.footerContent}>
            <ul>
              <li
                onClick={() => {
                  handleOn(1);
                }}
                className={on === 1 ? styles.on : ''}>
                <Link href="/threads">
                  <span className={styles.a}>
                    <span className={styles.ico}>
                      {on === 1 ? (
                        <Image
                          width={24}
                          height={24}
                          src={'/assets/icons/chat_on.svg'}
                          alt="푸터메뉴1"
                        />
                      ) : (
                        <Image
                          width={24}
                          height={24}
                          src={'/assets/icons/chat_off.svg'}
                          alt="푸터메뉴1"
                        />
                      )}
                    </span>
                    <span className={styles.tag}>채팅방</span>
                  </span>
                </Link>
              </li>
              <li
                onClick={() => {
                  handleOn(2);
                }}
                className={on === 2 ? styles.on : ''}>
                <Link href="/mypage/myGatherings/participant">
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
                </Link>
              </li>
              <li
                onClick={() => {
                  handleOn(3);
                }}
                className={on === 3 || on === 0 ? styles.on : ''}>
                <Link href="/main">
                  <span className={styles.a}>
                    <span className={styles.ico}>
                      {on === 3 || on === 0 ? (
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
                <Link href="/gatherings">
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
                </Link>
              </li>
              <li
                onClick={() => {
                  handleOn(5);
                }}
                className={on === 5 ? styles.on : ''}>
                <Link href="/mypage">
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
      )}
    </footer>
  );
}
