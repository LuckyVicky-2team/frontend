'use client';
import { useState, useEffect } from 'react';
import styles from './info.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteLoginRT, deleteReissueRT } from '@/api/apis/logOutApis';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';

// 환경 변수에서 도메인 가져오기
const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

interface IUserProfile {
  email: string;
  nickName: string;
  profileImage: string;
  averageRating: number;
  prTags: string[];
}

interface IInfoProps {
  mypageInfo: IUserProfile | null;
  handleEditOpen: () => void;
  updateInfo: () => void;
  checkedLogin: string | null;
}

export default function Info({
  mypageInfo,
  handleEditOpen,
  // updateInfo,
}: IInfoProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const router = useRouter();

  const queryClient = useQueryClient();

  // 프로필 이미지 URL
  const profileImageUrl = mypageInfo?.profileImage
    ? `https://${cloud}/${mypageInfo.profileImage}`
    : '/assets/myPageImages/defaultProfile.png';

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    await deleteLoginRT();
    await deleteReissueRT();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('notification');
    localStorage.removeItem('isVerifiedUser');

    // GATHERING.DETAIL 관련 쿼리, user.quit, me관련 쿼리만 제거
    queryClient.removeQueries({
      predicate: query => {
        const queryKey = query.queryKey;
        return (
          (Array.isArray(queryKey) &&
            queryKey.length >= 2 &&
            queryKey[0] === QueryKey.GATHERING.KEY &&
            typeof queryKey[1] === 'number') ||
          queryKey[0] === 'quit' ||
          queryKey[0] === QueryKey.USER.ME
        );
      },
    });

    setLoggedIn(false);
    router.push('/');
  };

  return (
    <div className={styles.relative}>
      <div className={`${styles.editModal2}`}></div>
      <div className={styles.card}>
        <div className={styles.top}>
          <h2>내 프로필</h2>
          <button type="button" onClick={handleEditOpen}>
            <Image
              width={32}
              height={32}
              src="/assets/icons/penEditIco.svg"
              alt="프로필 편집 아이콘"
            />
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profileImg}>
            <div className={styles.proImgSpace}>
              <Image
                width={111}
                height={111}
                src={profileImageUrl}
                alt="프로필사진"
                style={{ width: '100%', height: '100%' }}
                unoptimized
              />
            </div>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.topInfo}>
              {loggedIn ? (
                <>
                  <b>{mypageInfo?.nickName}</b>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                    }}>
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/signin">로그인</Link>
              )}
            </div>
            {loggedIn ? (
              <ul className={styles.list}>
                {/* <li>
                  <b>company.</b>
                  <p>BoardGo</p>
                </li> */}
                <li>
                  <b>E-mail.</b>
                  <p>{mypageInfo?.email}</p>
                </li>
              </ul>
            ) : (
              <div className={styles.noneResi}>
                비회원입니다. <br /> 회원가입을하고 보고의 많은 서비스를
                즐겨보세요 !
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
