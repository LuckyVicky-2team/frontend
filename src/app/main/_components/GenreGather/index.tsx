import React, { useState, useEffect, useRef } from 'react';
import styles from './GenreGather.module.scss';
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

export default function GenreGather({ meetingList }: DeadLineGatherProps) {
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
          <h1 className={styles.title1}>그 모임 지금 핫해요!</h1>
          <b className={styles.title2}>인기모임</b>
        </div>
      </div>
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
            return (
              <li
                key={e.id}
                style={{
                  transform: `translateX(${slidePx}px)`,
                  transition: '0.3s ease all',
                }}>
                <Link href="/">
                  <span className={styles.famousIco}>★ 인기★</span>
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
