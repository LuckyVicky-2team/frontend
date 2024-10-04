/* eslint-disable indent */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper 스타일
import 'swiper/css/navigation'; // 내비게이션 모듈 스타일
import { Navigation } from 'swiper/modules';
import styles from './DeadLineGather.module.scss';
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

export default function DeadLineGather({ meetingList }: DeadLineGatherProps) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const formatMeetingDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();

    return `${year}년 ${month}월 ${day}일 ${hours}시`;
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

  // 현재 시간 기준으로 필터링: 오늘 이전의 모임 제외, 3일 이내 마감인 모임만 포함
  const filteredMeetingList = meetingList?.filter(meeting => {
    const now = new Date();
    const meetingDate = new Date(meeting.meetingDate);
    const timeDiff = meetingDate.getTime() - now.getTime();
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return meetingDate > now && daysLeft <= 2;
  });

  return (
    <div>
      <div className={styles.newTitle}>
        <Image
          width={155}
          height={155}
          src={'/assets/mainImages/time.png'}
          alt="타이틀 왼쪽 이미지"
        />
        <div className={styles.titleTxt}>
          <h1 className={styles.title1}>곧! 모집이 마감됩니다!</h1>
          <b className={styles.title2}>마감임박</b>
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
        <p>추리게임</p>
      </div> */}

      <div className={styles.sliderContainer}>
        <Swiper
          className={styles.genreList}
          modules={[Navigation]}
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
            330: {
              slidesPerView: 1,
            },
          }}>
          {Array.isArray(filteredMeetingList) &&
          filteredMeetingList.length > 0 ? (
            filteredMeetingList?.map(e => {
              const gatheringDate = new Date(e.meetingDate);
              return (
                <SwiperSlide key={e.id}>
                  <li key={e.id}>
                    <Link href={`/gatherings/${e?.id}`}>
                      {/* <span className={styles.famousIco}>★ 인기★</span> */}
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
                          src={`https://${cloud}/${e.thumbnail}`}
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
                        <SaveGatheringButton
                          id={e?.id}
                          size="small"
                          type="blue"
                        />
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
              );
            })
          ) : (
            <p className={styles.noDeadList}>
              지금은 마감임박한 모임이 없어요!
            </p>
          )}
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
