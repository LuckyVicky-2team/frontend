'use client';

import React from 'react';
import { useWrittenMeetingList } from '@/api/queryHooks/review';
import styles from './MyReviews.module.scss';
import MyReviewItem from '../_components/MyReviewItem';
import ReviewSkeleton from '@/app/gatherings/_components/Skeleton';

export default function MyReviews() {
  const { data, isLoading } = useWrittenMeetingList({
    reviewType: 'FINISH',
  });

  if (isLoading) {
    return (
      <div className={styles.skeletonContainer}>
        <ReviewSkeleton type={'review'} />
      </div>
    );
  }
  return (
    <>
      {data?.length === 0 ? (
        <div className={styles.emptyReview}>
          <span className={styles.boxInfo}>아직 작성한 리뷰가 없어요</span>
        </div>
      ) : (
        data?.map(el => (
          <React.Fragment key={el.meetingId}>
            <MyReviewItem data={el} />
          </React.Fragment>
        ))
      )}
    </>
  );
}
