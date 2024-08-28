'use client';

import React from 'react';
import styles from './ReviewPage.module.scss';
import GatheringItem from '../_components/GatheringItem';
import { useMeetingList } from '@/api/queryHooks/review';

export default function ReviewPage() {
  const { data } = useMeetingList({ reviewType: 'PRE_PROGRESS' });

  return (
    <div className={styles.container}>
      {data ? (
        data.map(meeting => {
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
