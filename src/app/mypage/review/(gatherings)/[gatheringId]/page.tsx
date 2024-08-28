'use client';

import React, { useEffect } from 'react';
import styles from './GatheringID.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { transDate } from '@/utils/common';
import IconButton from '@/components/common/IconButton';
import { useRevieweeList, useMeetingList } from '@/api/queryHooks/review';
import { useRouter } from 'next/navigation';

export default function SingleGatheringPage({
  params,
}: {
  params: { gatheringId: number };
}) {
  const router = useRouter();
  const { data: meetingList } = useMeetingList({ reviewType: 'PRE_PROGRESS' });
  const { data: revieweeList } = useRevieweeList({
    meetingId: params.gatheringId,
  });
  const meetingData =
    meetingList &&
    meetingList?.find(el => el.meetingId === Number(params.gatheringId));
  const { mondthAndDay, time } = meetingData
    ? transDate(meetingData.meetingDate)
    : { mondthAndDay: '', time: '' };

  const imageURL =
    meetingData && meetingData.thumbnail
      ? `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${meetingData.thumbnail}`
      : '/assets/images/emptyThumbnail.png';

  useEffect(() => {
    if (!meetingList) router.push('/mypage/review');
  }, [meetingList]);

  useEffect(() => {
    if (revieweeList?.length === 0) {
      router.push('/mypage/review');
    }
  }, [revieweeList?.length]);
  return (
    <div className={styles.container}>
      {meetingData && (
        <div className={styles.meetingDetailContainer}>
          <div className={styles.meetingDeatilHeader}>
            <h1>{meetingData.title}</h1> 모임 리뷰
          </div>

          <div className={styles.meetingDetailContent}>
            <div className={styles.thumbnail}>
              <Image
                src={imageURL}
                alt="thumbnail"
                fill
                sizes={'100%'}
                priority
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{meetingData.title}</h3>
              <p className={styles.location}>
                <span>|</span> {meetingData.city} {meetingData.county}
              </p>
              <div className={styles.time}>
                <p>{mondthAndDay}</p>
                <p className={styles.timeDetail}>{time}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
          {revieweeList?.map((user: any) => (
            <div key={user.revieweeId} className={styles.reviewee}>
              <IconButton
                imgUrl={'/assets/mainImages/profile.svg'}
                className={styles.profile}
              />
              <div className={styles.name}>{user.revieweeName}</div>

              <Link
                href={{
                  pathname: `${params.gatheringId}/${user.revieweeId}`,
                  query: {
                    revieweeName: `${user.revieweeName}`,
                  },
                }}
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
