import React, { useState, useEffect, useRef } from 'react';
import styles from './DeadLineGather.module.scss';
import Link from 'next/link';
import Image from 'next/image';

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
  const [slidePx, setSlidePx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const screenWidth = 320; // 고정된 화면 너비 (예: 최소 320px)

  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  useEffect(() => {
    const calculateContainerWidth = () => {
      if (listRef.current) {
        const listWidth = listRef.current.scrollWidth;
        setContainerWidth(listWidth);
      }
    };

    // 컴포넌트 마운트 시 및 윈도우 리사이즈 시 컨테이너 너비 계산
    calculateContainerWidth();
    window.addEventListener('resize', calculateContainerWidth);

    return () => {
      window.removeEventListener('resize', calculateContainerWidth);
    };
  }, [meetingList]);

  const prevSlideBtn = () => {
    setSlidePx(prev => Math.min(prev + screenWidth, 0)); // 슬라이드가 0보다 커지지 않도록
  };

  const nextSlideBtn = () => {
    setSlidePx(prev =>
      Math.max(prev - screenWidth, -(containerWidth - screenWidth))
    );
  };
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

      <div className={styles.sliderContainer}>
        <ul ref={listRef} className={styles.genreList}>
          {slidePx < 0 && (
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
          {slidePx > -(containerWidth - screenWidth) && (
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
                  transform: `translateX(${slidePx}px)`,
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
                      src={`https://${cloud}/${e?.thumbnail}`}
                      alt="게임이미지"
                      width={224}
                      height={224}
                      unoptimized={true}
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
                    <input type="checkbox" id={`favorite${e.id}`} />
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
    </div>
  );
}
