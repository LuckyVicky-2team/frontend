'use client';

import styles from './mypage.module.scss';
import Info from './_components/Info/Info';
import Link from 'next/link';
import { useState } from 'react';
import { getPersonalInfo } from '@/api/apis/mypageApis';
import InfoEdit from './_components/infoEdit/infoEdit';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

// UserProfile 인터페이스의 이름을 I로 시작하도록 수정
interface IUserProfile {
  email: string; // 회원 고유 ID
  nickName: string; // 닉네임
  profileImage: string; // 프로필 이미지
  averageRating: number; // 평균 별점
  prTags: string[]; // PR 태그 (없을 경우 빈 배열 반환)
}

export default function MyPage() {
  const [editOpen, setEditOpen] = useState(false); // 정보 수정 모달 상태
  const [prOpen, setPrOpen] = useState(false); // PR 태그 표시 상태

  // React Query를 사용하여 사용자 정보 가져오기
  const {
    data: userInfo, // 사용자 정보
    isLoading, // 로딩 상태
    refetch, // 정보 갱신 함수
  } = useQuery<IUserProfile>({
    queryKey: ['personalInfo'], // Query Key
    queryFn: getPersonalInfo, // 데이터를 가져오는 함수
    staleTime: 5 * 60 * 1000, // 데이터가 5분 동안 신선하게 유지
    cacheTime: 10 * 60 * 1000, // 데이터가 10분 동안 캐시
    refetchOnWindowFocus: false, // 창 전환 시 자동 갱신 비활성화
  });

  // 정보 수정 모달 열기/닫기 핸들러
  const handleEditOpen = () => {
    setEditOpen(prev => !prev);
  };

  // 평점 애니메이션 계산
  const animatedRating = userInfo?.data?.averageRating || 0;
  const ratingPercentage = (animatedRating / 5) * 100;

  return (
    <div className={styles.relative}>
      {/* 정보 수정 모달 */}
      {userInfo && (
        <div
          className={`${styles.editModal} ${editOpen ? styles.on : styles.off}`}>
          <InfoEdit
            handleEditOpen={handleEditOpen}
            updateInfo={refetch} // refetch를 통해 최신 데이터 가져오기
            mypageInfo={userInfo.data}
          />
        </div>
      )}

      <h1 className={styles.title}>마이페이지</h1>

      {/* 로딩 상태 및 사용자 정보 표시 */}
      {isLoading ? (
        <div className={styles.infoSkeleton}></div>
      ) : (
        <Info
          mypageInfo={userInfo.data}
          handleEditOpen={handleEditOpen}
          updateInfo={refetch}
        />
      )}

      <div className={styles.averageGrade}>
        <b>매너능력치</b>
        <div className={styles.line}>
          <div
            className={styles.averageLine}
            style={{
              width: `${
                ratingPercentage <= 20 ? 15 : Math.min(ratingPercentage, 100)
              }%`,
            }}>
            <p className={styles.average}>{animatedRating.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className={styles.prWrap}>
        <button type="button" onClick={() => setPrOpen(prev => !prev)}>
          {/* <Image src="/assets/icons/downArrow.svg" alt="PR 태그 아이콘" width={24} height={24} /> */}
        </button>
        <p className={styles.myPrTag}>
          <Link href="/mypage/prEdit">
            내 PR 태그
            <Image
              width={32}
              height={32}
              src={'/assets/icons/chevron-left.svg'}
              alt="마이페이지 화살표"
            />
          </Link>
        </p>
        <ul className={prOpen ? styles.prOpen : undefined}>
          {userInfo?.data?.prTags?.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>

      <ul className={styles.menuWrap}>
        <li>
          <Link href="/mypage/myGatherings/participant">
            내 모임
            <Image
              width={32}
              height={32}
              src={'/assets/icons/chevron-left.svg'}
              alt="마이페이지 화살표"
            />
          </Link>
        </li>
        <li>
          <Link href="/mypage/myFavoriteGatherings">
            찜한 모임
            <Image
              width={32}
              height={32}
              src={'/assets/icons/chevron-left.svg'}
              alt="마이페이지 화살표"
            />
          </Link>
        </li>
        <li>
          <Link href="/mypage/review">
            리뷰
            <Image
              width={32}
              height={32}
              src={'/assets/icons/chevron-left.svg'}
              alt="마이페이지 화살표"
            />
          </Link>
        </li>
        <li>
          <Link href="/mypage/settingAlarm">
            설정
            <Image
              width={32}
              height={32}
              src={'/assets/icons/chevron-left.svg'}
              alt="마이페이지 화살표"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}
