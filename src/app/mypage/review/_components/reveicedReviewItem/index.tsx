import styles from './ReceivedReviewItem.module.scss';
import { MannerList } from './MannerList';
import { IReceivedReviewItemProps } from '@/app/mypage/mockData/mockDataType';
export default function ReceivedReviewItem({
  positiveTags,
  negativeTags,
}: IReceivedReviewItemProps) {
  return (
    <>
      <div className={styles.reviewItem}>
        <MannerList
          evaluationTags={positiveTags}
          title="받은 좋은매너 평가"
          icon="😊"
          emptyMessage="받은 칭찬매너가 없어요"
        />
        <MannerList
          evaluationTags={negativeTags}
          title="받은 비매너 평가"
          icon="😟"
          emptyMessage="받은 비매너가 없어요"
        />
      </div>
    </>
  );
}
