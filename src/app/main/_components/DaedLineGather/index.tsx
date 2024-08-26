'use client';
import React, { useState } from 'react';
import styles from './DeadLineGather.module.scss';
import Link from 'next/link';
import Image from 'next/image';
// IMeetingProps 타입 정의
interface IMeetingProps {
  id: number;
  title: string;
  city: string;
  county: string;
  thumbnail: string;
  meetingDate: string;
  participantCount: number;
  limitParticipant: number;
  nickName: string;
  likeStatus: string;
  viewCount: number;
  games: string[];
  tags: string[];
}
interface DeadLineGatherProps {
  meetingList: IMeetingProps[] | undefined;
}

export default function DeadLineGather({ meetingList }: DeadLineGatherProps) {
  // const [heart, setHeart] = useState<{ [key: number]: boolean }>({});
  const [slidePx, setSlidePx] = useState(0);

  // useEffect(() => {
  //   // 로컬 스토리지에서 heart 상태 불러오기
  //   const savedHeart = localStorage.getItem('heart');
  //   if (savedHeart) {
  //     setHeart(JSON.parse(savedHeart));
  //   }
  // }, []);

  // useEffect(() => {
  //   if (Object.keys(heart).length > 0) {
  //     localStorage.setItem('heart', JSON.stringify(heart));
  //   }
  // }, [heart]);

  // const toggleHeart = (id: number) => {
  //   setHeart(prevHeart => {
  //     const newHeart = { ...prevHeart, [id]: !prevHeart[id] };
  //     const storedItems = JSON.parse(
  //       localStorage.getItem('savedItems') || '[]'
  //     );

  //     if (newHeart[id]) {
  //       // 찜 추가
  //       const itemToSave = data.find(item => item.id === id);
  //       if (
  //         itemToSave &&
  //         !storedItems.some((item: DateData) => item.id === id)
  //       ) {
  //         localStorage.setItem(
  //           'savedItems',
  //           JSON.stringify([...storedItems, itemToSave])
  //         );
  //       }
  //     } else {
  //       // 찜 제거
  //       const updatedItems = storedItems.filter(
  //         (item: DateData) => item.id !== id
  //       );
  //       localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  //     }

  //     return newHeart;
  //   });
  // };

  const prevSlideBtn = () => {
    if (slidePx < 0) {
      setSlidePx(slidePx + 200);
    }
  };
  const nextSlideBtn = () => {
    if (slidePx > -800) {
      setSlidePx(slidePx - 200);
    }
  };

  // const today = new Date();
  // const filterDeadLineGathering = data.filter(e => {
  //   const endDate = new Date(e.gatheringDate);
  //   return (
  //     endDate >= today &&
  //     endDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) // 3일 안쪽
  //   );
  // });

  const formatTimeLeft = (endDate: Date) => {
    const now = new Date();
    const timeDiff = endDate.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    const parts = [];
    if (daysLeft > 0) parts.push(`${daysLeft}일`);
    if (hoursLeft > 0 || daysLeft > 0) parts.push(`${hoursLeft}시간`);
    if (minutesLeft > 0 || hoursLeft > 0 || daysLeft > 0)
      parts.push(`${minutesLeft}분`);

    return parts.join(' ');
  };

  return (
    <div>
      <h1 className={styles.title1}>얼른 모임에 들어가야하는 !</h1>
      <b className={styles.title2}>마감임박 모임!</b>
      <div className={styles.lineTitle}>
        <p>추리게임</p>
      </div>

      <ul className={styles.genreList}>
        {slidePx != 0 && (
          <button onClick={prevSlideBtn} className={styles.prevBtn}>
            <Image
              width={20}
              height={20}
              objectFit="cover"
              src={'/assets/mainImages/backIcon.svg'}
              alt="왼쪽 슬라이드 버튼"
            />
          </button>
        )}
        {slidePx != -800 && (
          <button onClick={nextSlideBtn} className={styles.nextBtn}>
            <Image
              width={20}
              height={20}
              objectFit="cover"
              src={'/assets/mainImages/backIcon.svg'}
              alt="오른쪽 슬라이드 버튼"
            />
          </button>
        )}

        {meetingList?.map(e => {
          const gatheringDate = new Date(e.meetingDate);
          return (
            <li
              key={e.id}
              style={{
                transform: `translateX(${slidePx}%)`,
                transition: '0.3s ease all',
              }}>
              <Link href="/">
                <span className={styles.famousIco}>★ 인기★</span>
                <span className={styles.deadLineIco}>
                  <Image
                    src={'/assets/icons/alarmIcon.svg'}
                    width={16}
                    height={16}
                    alt={'마감임박 이미지'}
                  />
                  {formatTimeLeft(gatheringDate)} 후 마감
                </span>
                <span className={styles.img}>
                  <Image
                    // src={e.thumbnail}
                    src={'/assets/mainImages/game.png'}
                    alt="게임이미지"
                    width={224}
                    height={224}
                  />
                </span>
              </Link>
              <span className={styles.mid}>
                <span className={styles.loc}>
                  <Image
                    src={'/assets/mainImages/loc_ico.svg'}
                    width={24}
                    height={24}
                    alt="지도 이미지"
                  />
                  {e.city}
                </span>
                <span className={styles.heart}>
                  <input
                    type="checkbox"
                    id={`favorite${e.id}`}
                    // checked={!!heart[e.id]}
                    // onChange={() => toggleHeart(e.id)}
                  />
                  <label htmlFor={`favorite${e.id}`}>
                    {/* <Image
                      src={
                        heart[e.id]
                          ? '/assets/mainImages/heart_fill_ico.svg'
                          : '/assets/mainImages/heart_ico.svg'
                      }
                      width={24}
                      height={24}
                      alt="찜 하트"
                    /> */}
                  </label>
                </span>
              </span>
              <Link href="/">
                <span className={styles.tag}>{e.title}</span>
              </Link>
              <span className={styles.date}>{e.meetingDate}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
