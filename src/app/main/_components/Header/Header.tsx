'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getLikeList, getPersonalInfo } from '@/api/apis/mypageApis';
import { getAlrmList } from '@/api/apis/headerApis';
import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import styles from './Header.module.scss';

interface INotification {
  notificationId: number;
  title: string;
  content: string;
  isRead: boolean;
  pathUrl: string;
}

export default function Header() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profileImageTimestamp, setProfileImageTimestamp] = useState<
    string | undefined
  >(undefined);
  // const [error, setError] = useState<string | null>(null);
  const [alrmCheck, setAlrmCheck] = useState<INotification[]>([]);

  const pathName = usePathname();
  const router = useRouter();

  const { data: info, isPending: isInfoPending } = useQuery({
    queryKey: [QueryKey.USER.KEY, QueryKey.USER.ME],
    queryFn: async () => {
      const { data } = await getPersonalInfo();
      return data;
    },
    enabled: loggedIn,
  });

  const { data: likeList } = useQuery({
    queryKey: QueryKey.USER.WISHLIST(),
    queryFn: async () => {
      const { data } = await getLikeList();
      return data;
    },
    enabled: loggedIn,
  });

  // const currentPathName = pathName.split('/')[1];
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const profileImageUrl = info?.profileImage
    ? `https://${cloud}/${info.profileImage}?t=${profileImageTimestamp}`
    : '/assets/myPageImages/profileImgEdit.png';

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (info) setProfileImageTimestamp(new Date().getTime().toString());
  }, [info]);

  useEffect(() => {
    const handleAccessTokenChange = () => {
      const token = localStorage.getItem('accessToken');

      if (token) setLoggedIn(true);
      else setLoggedIn(false);
    };

    window.addEventListener('changeAccessToken', handleAccessTokenChange);

    return () => {
      window.removeEventListener('changeAccessToken', handleAccessTokenChange);
    };
  }, []);

  useEffect(() => {
    const fetchGetAlrm = async () => {
      try {
        const response = await getAlrmList();
        setAlrmCheck(response.data);
      } catch (err) {}
    };

    fetchGetAlrm();
  }, []);

  // 알람중에서 isRead가 false인것 필터링
  const filterNoReadAlrm = alrmCheck.filter(alrmItem => !alrmItem.isRead);

  return (
    <header>
      <div
        className={`${styles.headerContainer} ${
          !isInfoPending ? styles.loaded : styles.loading
        }`}>
        {pathName.startsWith('/mypage/myGathering') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.push('/mypage')}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                내 모임
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/mypage/asd') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
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
        ) : pathName.startsWith('/mypage/review') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                리뷰
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/mypage/myFavoriteGatherings') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                찜한 모임
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/mypage/settingAlarm') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                설정
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/gatherings/new/success') ? (
          <div className={styles.customHeader} style={{ display: 'none' }}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                모임 등록 완료
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/gatherings/new/') ? (
          <div className={styles.customHeader} style={{ display: 'none' }}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                모임 등록
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/gatherings/new') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                {/* 모임 등록 */}
              </p>
              {/* <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div> */}
            </div>
          </div>
        ) : pathName.startsWith('/mypage/prEdit') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                PR태그 수정
              </p>
              <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div>
            </div>
          </div>
        ) : pathName.startsWith('/signin') ? (
          <div className={styles.customHeader}>
            <div className={styles.space}></div>
            <div className={styles.headerContent}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                {/* 모임 등록 */}
              </p>
              {/* <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div> */}
            </div>
          </div>
        ) : pathName.startsWith('/signup') ? (
          <div className={styles.customHeader} style={{ display: 'none' }}>
            <div className={styles.space}></div>
            <div className={styles.headerContent} style={{ display: 'none' }}>
              <p>
                <button type="button" onClick={() => router.back()}>
                  <span>
                    <Image
                      width={16}
                      height={16}
                      src="/assets/mainImages/backIcon.svg"
                      alt="뒤로가기 아이콘"
                    />
                  </span>
                </button>
                {/* 모임 등록 */}
              </p>
              {/* <div className={styles.right}>
                <h2>
                  <Link href="/">BOGO</Link>
                </h2>
              </div> */}
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
                      src="/assets/mainImages/blackHeart.svg"
                      alt="즐겨찾기 아이콘"
                    />
                    <span>{likeList?.length}</span>
                  </a>
                  <button
                    className={styles.headerAlarmIcon}
                    onClick={() => {
                      router.push('/notification');
                    }}>
                    <Image
                      width={56}
                      height={56}
                      src="/assets/mainImages/alarm.svg"
                      alt="알람 아이콘"
                    />
                    {filterNoReadAlrm?.length > 0 ? <span></span> : null}
                  </button>
                  <Link href="/mypage" className={styles.headerMyapgeButton}>
                    <Image
                      width={24}
                      height={24}
                      src={profileImageUrl}
                      alt="프로필 사진"
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
