'use client';

import React from 'react';
import styles from './GatheringID.module.scss';
import Link from 'next/link';
import { gatheringList } from '@/app/mypage/mockData/mockData';
import Image from 'next/image';
import { transDate } from '@/utils/common';
import IconButton from '@/components/common/IconButton';

export default function SingleGatheringPage({
  params,
}: {
  params: { gatheringId: number };
}) {
  const item = gatheringList.find(el => el.id === Number(params.gatheringId));
  const { title, thumbnail, city, county, id, gatheringDate } = item;
  const { mondthAndDay, time } = transDate(gatheringDate);
  const imageURL = thumbnail
    ? `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
    : '/assets/images/emptyThumbnail.png';

  return (
    <div className={styles.container}>
      <div className={styles.meetingDetailContainer}>
        <div className={styles.meetingDeatilHeader}>
          <h1>{item.title}</h1> 모임 리뷰
        </div>

        <div className={styles.meetingDetailContent}>
          <div className={styles.thumbnail}>
            <Image
              src={imageURL}
              alt="thumbnail"
              width={142}
              height={194}
              layout={'responsive'}
              priority
            />
          </div>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.location}>
              <span>|</span> {city} {county}
            </p>
            <div className={styles.time}>
              <p>{mondthAndDay}</p>
              <p className={styles.timeDetail}>{time}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.participantListContainer}>
        <div className={styles.title}>
          <Image
            src={'/assets/icons/verticalLine.svg'}
            alt={'divider'}
            width={30}
            height={26}
          />
          <span>참여자</span>
        </div>
        <div className={styles.revieweeCardContainer}>
          {item.participants.map((user: any) => (
            <div key={user.userId} className={styles.reviewee}>
              <IconButton
                imgUrl={'/assets/mainImages/profile.svg'}
                className={styles.profile}
                clickIconButtonHandler={() => {
                  //@haewon 클릭시 리뷰이(모임 참여자) 프로필 보기?
                }}
              />
              <div className={styles.name}>{user.userName}</div>

              <Link
                href={{
                  pathname: `${id}/${user.userId}`,
                  query: {
                    revieweeName: `${user.userName}`,
                    revieweeId: `${user.userId}`,
                  },
                }}
                as={`${id}/reviewee-${user.userName}`}
                className={styles.writeReviewBtn}>
                리뷰쓰기
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
