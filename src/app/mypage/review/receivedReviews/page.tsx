'use client';

import { useReceivedReview } from '@/api/queryHooks/review';
import styles from './ReceivedReviews.module.scss';
import Rating from '@/components/common/Rating';
import Spinner from '@/components/common/Spinner';
import ReceivedReviewItem from '../_components/reveicedReviewItem';

export default function ReceivedReviews() {
  const { data, isLoading } = useReceivedReview();

  if (isLoading) {
    return (
      <div className={`${styles.container} ${styles.loading}`}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div className={styles.rating}>
            <Rating readable rating={data.averageRating} size={'medium'} />
            <p>{data.averageRating}</p>
          </div>

          <ReceivedReviewItem
            positiveTags={data.positiveTags}
            negativeTags={data.negativeTags}
          />
        </>
      ) : (
        <div className={styles.emptyReview}>
          <span className={styles.boxInfo}>아직 받은 리뷰가 없어요</span>
        </div>
      )}
    </div>
  );
}
