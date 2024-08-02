import React from 'react';
import styles from './Footer.module.scss';
import Image from 'next/image';
import FooterMenu1 from '../../img/f1.svg';
import FooterMenu2 from '../../img/f2.svg';
import FooterMenu3 from '../../img/f3.svg';
import FooterMenu4 from '../../img/f4.svg';
import FooterMenu5 from '../../img/f5.svg';
import Link from 'next/link';
const Footer = () => {
  return (
    <div>
      <div className={styles.space}></div>
      <div className={styles.footerContent}>
        <ul>
          <li>
            <Link href="/">
              <span className={styles.ico}>
                <Image src={FooterMenu1} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>채팅방</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className={styles.ico}>
                <Image src={FooterMenu2} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>내모임</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className={styles.ico}>
                <Image src={FooterMenu3} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>홈</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className={styles.ico}>
                <Image src={FooterMenu4} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>모임목록</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className={styles.ico}>
                <Image src={FooterMenu5} alt="푸터메뉴1" />
              </span>
              <span className={styles.tag}>내정보</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
