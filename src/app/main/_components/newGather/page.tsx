import React, { useState, useEffect, useRef } from 'react';
import styles from './newGather.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';

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

export default function NewGather({ meetingList }: DeadLineGatherProps) {
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

  const formatMeetingDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    const hours = date.getHours();

    return `${year}년 ${month}월 ${day}일 ${hours}시`;
  };

  const prevSlideBtn = () => {
    setSlidePx(prev => Math.min(prev + screenWidth, 0)); // 슬라이드가 0보다 커지지 않도록
  };

  const nextSlideBtn = () => {
    setSlidePx(prev =>
      Math.max(prev - screenWidth, -(containerWidth - screenWidth))
    );
  };

  // 현재 시간 이후의 모임만 필터링하고 최신순으로 정렬
  const now = new Date();
  const filteredMeetingList = meetingList
    ?.filter(meeting => new Date(meeting.meetingDate) > now)
    .sort(
      (a, b) =>
        new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()
    ); // 최신순 정렬

  return (
    <div>
      <div className={styles.newTitle}>
        <Image
          width={155}
          height={155}
          src={'/assets/mainImages/fire.png'}
          alt="타이틀 왼쪽 이미지"
        />
        <div className={styles.titleTxt}>
          <h1 className={styles.title1}>새로 생긴 모임들이에요!</h1>
          <b className={styles.title2}>신규모임</b>
        </div>
        <Link href={'/gatherings'}>
          더보기
          <Image
            width={12}
            height={12}
            src={'/assets/icons/backArrow.svg'}
            alt=""
          />
        </Link>
      </div>
      <div className={styles.lineTitle}>
        <p>모임 목록</p>
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

          {filteredMeetingList?.map(e => {
            return (
              <li
                key={e.id}
                style={{
                  transform: `translateX(${slidePx}px)`,
                  transition: '0.3s ease all',
                }}>
                <Link href={`/gatherings/${e?.id}`}>
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
                    <span className={styles.loc2}>
                      <span>{e.city}</span>
                      <span>{e.county}</span>
                    </span>
                  </span>
                  <span className={styles.heart}>
                    <SaveGatheringButton id={e?.id} size="small" type="blue" />
                  </span>
                </span>
                <Link href="/">
                  <span className={styles.tag}>{e.title}</span>
                </Link>
                <span className={styles.date}>
                  {formatMeetingDate(e.meetingDate)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
