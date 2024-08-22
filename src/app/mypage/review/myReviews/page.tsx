import { writtenReviewList } from '../../mockData/mockData';
import MyReviewItem from '../_components/MyReviewItem';
import styles from '../Layout.module.scss';

export default function MyReviews() {
  return (
    <>
      {writtenReviewList?.map(item => (
        <MyReviewItem key={item.id} item={item} />
      ))}
      {writtenReviewList.length === 0 && (
        <div className={styles.emptyReview}>
          <span className={styles.boxInfo}>아직 작성한 리뷰가 없어요</span>
        </div>
      )}
    </>
  );
}
