'use client';
import React, { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { getPersonalInfo } from '@/api/apis/mypageApis';

interface IUserProfile {
  email: string; // 회원 고유 ID
  nickName: string; // 닉네임
  profileImage: string; // 프로필 이미지
  averageRating: number; // 평균 별점
  prTags: string[]; // PR 태그 (없을 경우 빈 배열 반환)
}

export default function Header() {
  const [info, setInfo] = useState<IUserProfile | null>(null); // UserProfile 타입 사용
  const [loggedIn, setLoggedIn] = useState(true);
  const pathName = usePathname();
  const router = useRouter();

  //현재 pathname
  const currentPathName = pathName.split('/')[1];
  // 환경 변수에서 도메인 가져오기
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  // 올바른 이미지 URL 구성
  const profileImageUrl = info?.profileImage
    ? `https://${cloud}/${info?.profileImage}`
    : '/assets/myPageImages/profileImgEdit.png';

  const fetchPersonalInfo = async () => {
    try {
      const response = await getPersonalInfo();
      setInfo(response.data);
    } catch (err) {
      console.error('err:', err);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  useEffect(() => {
    const getLocal = localStorage.getItem('accessToken');
    setLoggedIn(getLocal !== null);
  }, [pathName]);

  useEffect(() => {
    const getFavorite = localStorage.getItem('heart');
    console.log(getFavorite?.length);
  }, []);

  return (
    <header>
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
        // default 기본 헤더
        <div>
          <div className={styles.space}></div>
          <div className={styles.headerContent}>
            <h1>
              <Link href="/main">BOGO</Link>
            </h1>
            {loggedIn === true ? (
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
    </header>
  );
}
