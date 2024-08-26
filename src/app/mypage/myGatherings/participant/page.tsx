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
        // Validate response data
        if (Array.isArray(response.data)) {
          setGatherings(response.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError('모임을 불러오는 중 오류가 발생했습니다.');
        console.error('Error fetching gatherings:', err);
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
        <Link href="participant" className={styles.on}>
          참여중모임
        </Link>
        <Link href="finish">종료된모임</Link>
        <Link href="create">내가만든모임</Link>
      </div>
      {gatherings.length > 0 ? (
        gatherings.map(gathering => (
          <div className={styles.myGathdringsItem} key={gathering.meetingId}>
            <div className={styles.img}>
              <Image
                src={gathering.imageUrl || '/assets/mainImages/game.png'} // Use imageUrl if available
                alt="참여 중 모임 썸네일"
                width={150}
                height={200}
              />
            </div>
            <div className={styles.info}>
              <h1>{gathering.title}</h1>
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
      ) : (
        <p>참여중인 모임이 없습니다.</p>
      )}
    </div>
  );
}
