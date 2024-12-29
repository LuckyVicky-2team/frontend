'use client';
import { useQuery } from '@tanstack/react-query';
import styles from './mypage.module.scss';
import Info from './_components/Info/Info';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPersonalInfo } from '@/api/apis/mypageApis';
import InfoEdit from './_components/infoEdit/infoEdit';
import Image from 'next/image';

interface IUserProfile {
  email: string;
  nickName: string;
  profileImage: string;
  averageRating: number;
  prTags: string[];
}

export default function MyPage() {
  const [editOpen, setEditOpen] = useState(false);
  const [prOpen, setPrOpen] = useState(false);
  const [animatedRating, setAnimatedRating] = useState<number>(0);
  const [checkedLogin, setCheckedLogin] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setCheckedLogin(token);
  }, []);

  const {
    data: info,
    isLoading,
    refetch,
  } = useQuery<IUserProfile>({
    queryKey: ['personalInfo'],
    queryFn: async () => {
      try {
        const response = await getPersonalInfo();
        // console.log('API 응답:', response); // 응답 로깅
        return response.data;
      } catch (error) {
        // console.error('Error fetching personal info:', error);
        return null; // 에러 시 null 반환
      }
    },
    staleTime: 5 * 60 * 1000, // 5분으로 설정 (밀리초 단위)
    enabled: !!checkedLogin,
  });

  useEffect(() => {
    if (checkedLogin) {
      refetch();
    }
  }, [checkedLogin, refetch]);

  useEffect(() => {
    if (info) {
      animateRating(info.averageRating);
    }
  }, [info]);

  const animateRating = (targetRating: number) => {
    let currentRating = 0;
    const increment = 0.1;
    const animationDuration = 1000;
    const interval = 16;

    const step = (animationDuration / interval) * increment;

    const animate = () => {
      if (currentRating < targetRating) {
        currentRating += step;
        if (currentRating > targetRating) currentRating = targetRating;
        setAnimatedRating(currentRating);
        requestAnimationFrame(animate);
      } else {
        setAnimatedRating(targetRating);
      }
    };

    animate();
  };

  const handleEditOpen = () => {
    setEditOpen(prev => !prev);
  };

  const updateInfo = () => {
    refetch();
  };

  const ratingPercentage = (animatedRating / 5) * 100;

  return (
    <div className={styles.relative}>
      {info && (
        <div
          className={`${styles.editModal} ${editOpen ? styles.on : styles.off}`}>
          <InfoEdit
            handleEditOpen={handleEditOpen}
            updateInfo={updateInfo}
            mypageInfo={info}
          />
        </div>
      )}

      <h1 className={styles.title}>마이페이지</h1>
      {isLoading ? (
        <div className={styles.infoSkeleton}></div>
      ) : (
        <div>
          <Info
            mypageInfo={info ?? null}
            handleEditOpen={handleEditOpen}
            updateInfo={updateInfo}
            checkedLogin={checkedLogin}
          />
        </div>
      )}

      <div className={styles.averageGrade}>
        <b>매너능력치</b>
        <div className={styles.line}>
          <div
            className={styles.averageLine}
            style={{
              width: `${ratingPercentage <= 20 ? 15 : Math.min(ratingPercentage, 100)}%`,
            }}>
            <p className={styles.average}>{animatedRating.toFixed(1)}</p>
          </div>
        </div>
      </div>
      <div className={styles.prWrap}>
        <button type="button" onClick={() => setPrOpen(prev => !prev)}>
          {/* PR 태그 펼치기 아이콘 */}
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
          {info?.prTags.map((item, i) => <li key={i}>{item}</li>)}
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
