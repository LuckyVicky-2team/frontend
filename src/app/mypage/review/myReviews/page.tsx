'use client';

import React from 'react';
import { useWrittenMeetingList } from '@/api/queryHooks/review';
import MyReviewItem from '../_components/MyReviewItem';
import styles from '../Layout.module.scss';

export default function MyReviews() {
  const { data } = useWrittenMeetingList({ reviewType: 'FINISH' });

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
