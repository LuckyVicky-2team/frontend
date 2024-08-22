import ReceivedReviewItem from '../_components/reveicedReviewItem';
import { receivedReviewList } from '../../mockData/mockData';

import styles from './ReceivedReviews.module.scss';

export default function ReceivedReviews() {
  const { positiveTags, negativeTags, averageRating } = receivedReviewList;
  if (!receivedReviewList) {
    return (
      <div className={styles.emptyReview}>
        <span className={styles.boxInfo}>아직 받은 리뷰가 없어요</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <p>내 평균 평점 : {averageRating}</p>
      <ReceivedReviewItem
        positiveTags={positiveTags}
        negativeTags={negativeTags}
      />
    </div>
  );
}
