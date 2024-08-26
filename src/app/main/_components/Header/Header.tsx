'use client';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getPersonalInfo } from '@/api/apis/mypageApis';

interface IUserProfile {
  email: string;
  nickName: string;
  profileImage: string;
  averageRating: number;
  prTags: string[];
}

export default function Header() {
  const [info, setInfo] = useState<IUserProfile | null>(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profileImageTimestamp, setProfileImageTimestamp] =
    useState<string>('');

  const pathName = usePathname();
  const router = useRouter();

  const currentPathName = pathName.split('/')[1];
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const profileImageUrl = info?.profileImage
    ? `https://${cloud}/${info?.profileImage}?t=${profileImageTimestamp}`
    : '/assets/myPageImages/profileImgEdit.png';

  const fetchPersonalInfo = async () => {
    try {
      const response = await getPersonalInfo();
      setInfo(response.data);
      setProfileImageTimestamp(new Date().getTime().toString()); // 이미지 URL에 타임스탬프 추가
    } catch (err) {
      console.error('err:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  useEffect(() => {
    const getLocal = localStorage.getItem('accessToken');
    setLoggedIn(getLocal !== null);
  }, [pathName]);

  return (
    <header>
      <div
        className={`${styles.headerContainer} ${
          !loading ? styles.loaded : styles.loading
        }`}>
        {currentPathName === 'mypage' ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button
                  type={'button'}
                  onClick={() => {
                    router.back();
                  }}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      objectFit="cover"
                      src={'/assets/mainImages/backIcon.svg'}
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                마이페이지
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <h1>
                <Link href="/main">BOGO</Link>
              </h1>
              {loggedIn ? (
                <div className={styles.right}>
                  <a
                    href="/mypage/myFavoriteGatherings"
                    className={styles.headerFavorite}>
                    <Image
                      width={32}
                      height={32}
                      objectFit="cover"
                      src={'/assets/mainImages/blackHeart.svg'}
                      alt=""
                    />
                    <span>12</span>
                  </a>
                  <button>
                    <Image
                      width={56}
                      height={56}
                      src={'/assets/mainImages/alarm.svg'}
                      alt="알람 아이콘"
                    />
                    <span></span>
                  </button>
                  <Link href={`/mypage`} className={styles.headerMyapgeButton}>
                    <Image
                      width={24}
                      height={24}
                      src={profileImageUrl}
                      alt="프로필사진"
                      style={{ width: '100%', height: '100%' }}
                      unoptimized={true}
                    />
                  </Link>
                </div>
              ) : (
                <div className={`${styles.right} ${styles.noneLogin}`}>
                  <Link href="/signin">로그인</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
