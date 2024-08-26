// pages/participant.tsx

'use client';
import { useState, useEffect } from 'react';
import { getPersonalGatherings } from '@/api/apis/mypageApis';
import styles from '../myGatherings.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface IGathering {
  meetingId: string;
  title: string;
  detailAddress: string;
  meetingDatetime: string;
  currentParticipant: number;
  limitParticipant: number;
  imageUrl: string;
}

export default function Participant() {
  const [gatherings, setGatherings] = useState<IGathering[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGatherings = async () => {
      try {
        const response = await getPersonalGatherings('PARTICIPANT');
        setGatherings(response.data);
      } catch (err) {
        setError('모임을 불러오는 중 오류가 발생했습니다.');
        console.log('err :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGatherings();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  console.log(gatherings);
  return (
    <div className={styles.myGatheringsListWrap}>
      <div className={styles.tabBtn2}>
        <Link href="participant" className={styles.on}>
          참여중모임
        </Link>
        <Link href="finish">종료된모임</Link>
        <Link href="create">내가만든모임</Link>
      </div>
      {gatherings.map(e => {
        return (
          <div className={styles.myGathdringsItem} key={e?.meetingId}>
            <div className={styles.img}>
              <Image
                src={'/assets/mainImages/game.png'}
                alt="참여 중 모임 썸네일"
                width={150}
                height={200}
              />
            </div>
            <div className={styles.info}>
              <h1>{e?.title}</h1>
              <b>{e?.detailAddress}</b>
              <p>
                {/* <span className={styles.time}>1월 7일 ∙ 17:30</span> */}
                <span className={styles.time}>{e?.meetingDatetime}</span>
                <span className={styles.person}>
                  <Image
                    src={'/assets/myPageImages/person.svg'}
                    alt={'인원 아이콘'}
                    width={18}
                    height={18}
                  />
                  {e?.currentParticipant}/{e?.limitParticipant}
                </span>
              </p>

              <div className={styles.outBtn}>
                <button>모임 나가기</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
