'use client';
import styles from './mypage.module.scss';
import Info from '../_components/Info/Info';
import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// interface PersonalInfo {
//   name: string;
// }

export default function MyPage() {
  // const [info, setInfo] = useState<PersonalInfo | null>(null);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     try {
  //       const res = await axios.get<PersonalInfo>(
  //         'http://54.180.60.122:8080/personal-info'
  //       );
  //       setInfo(res.data);
  //     } catch (err) {
  //       console.error('fetch err : ', err);
  //     }
  //   };

  //   fetchInfo();
  // }, []);

  // console.log('info :', info);

  return (
    <div className={styles.relative}>
      <h1 className={styles.title}>마이페이지</h1>
      <div>
        <Info />
      </div>
      <div className={styles.prWrap}>
        <ul>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
        </ul>
      </div>
      <ul className={styles.menuWrap}>
        <li>
          <Link href="/mypage/id/friendsList">친구목록</Link>
        </li>
        <li>
          <Link href="/mypage/id/myGatherings">내 모임</Link>
        </li>
        <li>
          <Link href="/mypage/id/myFavoriteGatherings">찜한 모임</Link>
        </li>
        <li>
          <Link href="/">알림 설정</Link>
        </li>
        <li>
          <Link href="/mypage/id/review">리뷰</Link>
        </li>
      </ul>
    </div>
  );
}
