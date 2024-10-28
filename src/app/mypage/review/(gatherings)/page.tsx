'use client';

import React from 'react';
import styles from './ReviewPage.module.scss';
import GatheringItem from '../_components/GatheringItem';
import { useMeetingList } from '@/api/queryHooks/review';
import Skeleton from '@/app/gatherings/_components/Skeleton';

export default function ReviewPage() {
  const { data, isLoading } = useMeetingList({
    reviewType: 'PRE_PROGRESS',
  });

  const dateSortedData =
    data &&
    data
      ?.slice()
      .sort(
        (a, b) =>
          new Date(b.meetingDate).getTime() - new Date(a.meetingDate).getTime()
      );

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.skeletonContainer}>
          <Skeleton type="review" />
        </div>
      ) : data ? (
        dateSortedData?.map(meeting => {
          return (
            <GatheringItem
              key={meeting.meetingId}
              data={meeting}
              buttonName="리뷰 남기기"
              href={`review/${meeting.meetingId}`}
            />
          );
        })
      ) : (
        <div className={styles.emptyReview}>
          <span className={styles.boxInfo}>리뷰작성 가능한 모임이 없어요</span>
        </div>
      )}
    </div>
  );
}
