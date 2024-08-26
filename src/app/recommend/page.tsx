'use client';
import { getRecommendInfo } from '@/api/apis/mypageApis';
import { useEffect, useState } from 'react';
import styles from './recommend.module.scss';
// import Image from 'next/image';
import Link from 'next/link';

export default function Recommend() {
  const [recommendInfo, setRecommendInfo] = useState();

  useEffect(() => {
    const fetchRecommendInfo = async () => {
      try {
        const res = await getRecommendInfo();
        setRecommendInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecommendInfo();
  }, []);
  //   useEffect(() => {
  //     const fetchGatherings = async () => {
  //       try {
  //         const apiUrl = process.env.NEXT_PUBLIC_DEPLOY_URL;

  //         if (!apiUrl) {
  //           throw new Error('API URL is not defined');
  //         }

  //         // 액세스 토큰 가져오기
  //         const accessToken =
  //           typeof window !== 'undefined'
  //             ? localStorage.getItem('accessToken')
  //             : null;

  //         // axios를 사용하여 API 요청 보내기
  //         const response = await axios.get(`${apiUrl}/home/situation`, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'X-API-Version': '1',
  //             Authorization: accessToken,
  //           },
  //         });

  //         setGatherings(response.data);
  //       } catch (error) {
  //         setError('모임을 불러오는 중 오류가 발생했습니다.');
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchGatherings();
  //   }, []);

  console.log(recommendInfo);

  return (
    <div className={styles.recoWrap}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder={'보드게임 이름으로 전체검색 해보세요!'}
        />
        <button>돋보기</button>
      </div>
      <div className={styles.recoTabWrap}>
        <Link href="/">2인 게임</Link>
        <Link href="/">3인 게임</Link>
        <Link href="/">다인용 게임</Link>
      </div>
      <div className={styles.recoListWrap}>
        <div className={styles.recoItem}>
          <div className={styles.img}>이미지</div>
          <h1 className={styles.title}>보드게임이름명</h1>
          <div className={styles.info}>
            <span>사람아이콘 2명</span>
            <span>시계아이콘 15분</span>
          </div>
          <div className={styles.category}>
            <span>카테고리</span>
            <span>카테고리</span>
          </div>
        </div>
      </div>
    </div>
  );
}
