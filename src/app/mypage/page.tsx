'use client';
import styles from './mypage.module.scss';
import Info from './_components/Info/Info';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPersonalInfo } from '@/api/apis/mypageApis';
import InfoEdit from './_components/infoEdit/infoEdit';

// UserProfile 인터페이스의 이름을 I로 시작하도록 수정
interface IUserProfile {
  email: string; // 회원 고유 ID
  nickName: string; // 닉네임
  profileImage: string; // 프로필 이미지
  averageRating: number; // 평균 별점
  prTags: string[]; // PR 태그 (없을 경우 빈 배열 반환)
}

export default function MyPage() {
  const [info, setInfo] = useState<IUserProfile | null>(null); // IUserProfile 타입 사용
  const [editOpen, setEditOpen] = useState(false);
  const [prOpen, setPrOpen] = useState(false);
  const [animatedRating, setAnimatedRating] = useState<number>(0); // Initial rating state

  // 정보 수정 모달 열기/닫기 핸들러
  const handleEditOpen = () => {
    setEditOpen(prev => !prev);
  };

  // 사용자 정보 가져오기
  const fetchPersonalInfo = async () => {
    try {
      const response = await getPersonalInfo();
      const targetRating = response.data.averageRating;

      // Animate rating
      let currentRating = 0;
      const increment = 0.1; // Increment step
      const animationDuration = 1000; // Duration in milliseconds
      const interval = 16; // Interval in milliseconds (roughly 60fps)

      const step = (animationDuration / interval) * increment; // Calculate increment per frame

      const animate = () => {
        if (currentRating < targetRating) {
          currentRating += step;
          if (currentRating > targetRating) currentRating = targetRating; // Cap at targetRating
          setAnimatedRating(currentRating);
          requestAnimationFrame(animate);
        } else {
          setAnimatedRating(targetRating); // Ensure final value is set
        }
      };

      animate(); // Start animation

      setInfo(response.data);
    } catch (err) {
      console.error('Failed to fetch personal info:', err);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져옵니다.
  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const ratingPercentage = (animatedRating / 5) * 100;

  return (
    <div className={styles.relative}>
      <div
        className={`${styles.editModal} ${editOpen ? styles.on : styles.off}`}>
        <InfoEdit
          handleEditOpen={handleEditOpen}
          updateInfo={fetchPersonalInfo}
        />
      </div>

      <h1 className={styles.title}>마이페이지</h1>
      <div>
        <Info
          mypageInfo={info}
          handleEditOpen={handleEditOpen}
          updateInfo={fetchPersonalInfo}
        />
      </div>
      <div className={styles.averageGrade}>
        <b>매너능력치</b>
        <div className={styles.line}>
          <div
            className={styles.averageLine}
            style={{ width: `${ratingPercentage}%` }} // Animate width based on animatedRating
          >
            <p className={styles.average}>{animatedRating.toFixed(1)}</p>{' '}
            {/* Display animated rating */}
          </div>
        </div>
      </div>
      <div className={styles.prWrap}>
        <button type="button" onClick={() => setPrOpen(prev => !prev)}>
          {/* <Image
            objectFit="cover"
            src='/assets/icons/downArrow.svg'
            alt='PR 태그 펼치기 아이콘'
            width={24}
            height={24}
          /> */}
        </button>
        <ul className={prOpen ? styles.prOpen : undefined}>
          {info?.prTags.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
      <ul className={styles.menuWrap}>
        <li>
          <Link href="/mypage/prEdit">PR 태그 수정</Link>
        </li>
        <li>
          <Link href="/mypage/friendsList">친구 목록</Link>
        </li>
        <li>
          <Link href="/mypage/myGatherings">내 모임</Link>
        </li>
        <li>
          <Link href="/mypage/myFavoriteGatherings">찜한 모임</Link>
        </li>
        <li>
          <Link href="/mypage/settingAlarm">알림 설정</Link>
        </li>
        <li>
          <Link href="/mypage/review">리뷰</Link>
        </li>
      </ul>
    </div>
  );
}
