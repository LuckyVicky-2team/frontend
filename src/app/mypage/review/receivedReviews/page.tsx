'use client';

import { useReceivedReview } from '@/api/queryHooks/review';
import ReceivedReviewItem from '../_components/reveicedReviewItem';
import styles from './ReceivedReviews.module.scss';
import Rating from '@/components/common/Rating';

export default function ReceivedReviews() {
  const { data } = useReceivedReview();

  if (!data) {
    return (
      <div className={styles.emptyReview}>
        <span className={styles.boxInfo}>아직 받은 리뷰가 없어요</span>
      </div>
    );
  } else
    return (
      <div className={styles.container}>
        <div className={styles.rating}>
          <Rating readable rating={data.averageRating} size={'medium'} />
          <p>{data.averageRating}</p>
        </div>

        <ReceivedReviewItem
          positiveTags={data.positiveTags}
          negativeTags={data.negativeTags}
        />
      </div>
    );
}
