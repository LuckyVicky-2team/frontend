'use client';
import { useState, useEffect } from 'react';
import { getPersonalGatherings } from '@/api/apis/mypageApis';
import styles from '../myGatherings.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 인터페이스 이름을 I로 시작하도록 수정
interface IGathering {
  meetingId: string;
  title: string;
  detailAddress: string;
  meetingDatetime: string;
  currentParticipant: number;
  limitParticipant: number;
  imageUrl: string;
  thumbnail: string;
}

export default function Finish() {
  const [gatherings, setGatherings] = useState<IGathering[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  useEffect(() => {
    const fetchGatherings = async () => {
      try {
        const response = await getPersonalGatherings('FINISH');
        if (Array.isArray(response.data)) {
          setGatherings(response.data);
        } else {
          setGatherings([]); // 빈 배열로 설정
        }
      } catch (err) {
        setError('모임을 불러오는 중 오류가 발생했습니다.');
        // console.error('Error fetching gatherings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGatherings();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.myGatheringsListWrap}>
      <div className={styles.tabBtn2}>
        <Link href="participant">참여중모임</Link>
        <Link href="finish" className={styles.on}>
          종료된모임
        </Link>
        <Link href="create">내가만든모임</Link>
      </div>

      {gatherings.length === 0 ? (
        <div className={styles.noMyGatheringsList}>
          <h1>
            <Image
              width={62}
              height={62}
              src={'/assets/myPageImages/logoGray.png'}
              alt="리스트 없을 때 로고"
            />
          </h1>
          <h2>BOGO</h2>
          <p>
            종료된 모임이 없어요! <br />
            모임을 둘러보면서 <br />
            다양한 게임들을 경험해보세요!
          </p>
          <Link href="/">다양한 모임 둘러보기</Link>
        </div>
      ) : (
        gatherings.map(gathering => (
          <div className={styles.myGathdringsItem} key={gathering.meetingId}>
            <div
              className={styles.img}
              onClick={() => {
                router.push(`/gatherings/${gathering?.meetingId}`);
              }}>
              <Image
                src={
                  `https://${cloud}/${gathering?.thumbnail}` ||
                  '/assets/mainImages/game.png'
                } // Use imageUrl if available
                alt="참여 중 모임 썸네일"
                width={150}
                height={200}
              />
            </div>
            <div className={styles.info}>
              <h1
                onClick={() => {
                  router.push(`/gatherings/${gathering?.meetingId}`);
                }}>
                {gathering.title}
              </h1>
              <b>{gathering.detailAddress}</b>
              <p>
                <span className={styles.time}>{gathering.meetingDatetime}</span>
                <span className={styles.person}>
                  <Image
                    src="/assets/myPageImages/person.svg"
                    alt="인원 아이콘"
                    width={18}
                    height={18}
                  />
                  {gathering.currentParticipant}/{gathering.limitParticipant}
                </span>
              </p>

              <div className={styles.outBtn}>
                <button>모임 나가기</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
