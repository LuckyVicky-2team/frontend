'use client';
import styles from './mypage.module.scss';
import Info from './_components/Info/Info';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPersonalInfo } from '@/api/apis/mypageApis';
import InfoEdit from './_components/infoEdit/infoEdit';

interface UserProfile {
  email: string; // 회원 고유 ID
  nickName: string; // 닉네임
  profileImage: string; // 프로필 이미지
  averageGrade: number; // 평균 별점
  prTags: string[]; // PR 태그 (없을 경우 빈 배열 반환)
}

export default function MyPage() {
  const [info, setInfo] = useState<UserProfile | null>(null); // UserProfile 타입 사용
  const [editOpen, setEditOpen] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(!editOpen);
  };

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

  console.log('info :', info);
  return (
    <div className={styles.relative}>
      <div className={`${styles.editModal}${editOpen === true ? 'on' : ''}`}>
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
      <div className={styles.prWrap}>
        <ul>
          {info?.prTags.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </div>
      <ul className={styles.menuWrap}>
        <li>
          <Link href="/mypage/friendsList">친구목록</Link>
        </li>
        <li>
          <Link href="/mypage/myGatherings">내 모임</Link>
        </li>
        <li>
          <Link href="/mypage/myFavoriteGatherings">찜한 모임</Link>
        </li>
        <li>
          <Link href="/">알림 설정</Link>
        </li>
        <li>
          <Link href="/mypage/review">리뷰</Link>
        </li>
      </ul>
    </div>
  );
}
