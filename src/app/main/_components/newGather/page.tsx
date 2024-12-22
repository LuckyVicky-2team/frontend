'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper 스타일
import 'swiper/css/navigation'; // 내비게이션 모듈 스타일
import { Navigation } from 'swiper/modules';
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

interface NewGatherProps {
  meetingList: IMeetingProps[] | undefined;
}

export default function NewGather({ meetingList }: NewGatherProps) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const formatMeetingDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    return `${year}년 ${month}월 ${day}일 ${hours}시`;
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
      {/* <div className={styles.lineTitle}>
        <p>모임 목록</p>
      </div> */}

      <div className={styles.sliderContainer}>
        <Swiper
          className={styles.genreList}
          modules={[Navigation]}
          // navigation // 내비게이션 버튼 사용
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          spaceBetween={20} // 슬라이드 간 간격 설정
          loop={false} // 루프 여부 설정
          draggable={true}
          breakpoints={{
            500: {
              slidesPerView: 3,
            },
            400: {
              slidesPerView: 2,
            },
            300: {
              slidesPerView: 2,
            },
          }}>
          {meetingList?.map(e => (
            <SwiperSlide key={e.id}>
              <li>
                <Link href={`/gatherings/${e?.id}`}>
                  <span className={styles.img}>
                    <Image
                      src={`https://${cloud}/${e?.thumbnail}`}
                      alt="게임이미지"
                      width={224}
                      height={224}
                      unoptimized={true}
                      onError={e => {
                        e.currentTarget.src =
                          '/assets/images/emptyThumbnail.png';
                      }}
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
                <Link href={`/gatherings/${e?.id}`}>
                  <span className={styles.tag}>{e.title}</span>
                </Link>
                <span className={styles.date}>
                  {formatMeetingDate(e.meetingDate)}
                </span>
              </li>
            </SwiperSlide>
          ))}
          <div className={`swiper-button-prev ${styles.swiperButtonPrev}`}>
            <Image
              src="/assets/mainImages/backIcon.svg" // 실제 화살표 이미지 경로로 수정하세요
              width={16}
              height={16}
              alt="이전"
            />
          </div>
          <div className={`swiper-button-next ${styles.swiperButtonNext}`}>
            <Image
              src="/assets/mainImages/backIcon.svg" // 실제 화살표 이미지 경로로 수정하세요
              width={16}
              height={16}
              alt="다음"
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
