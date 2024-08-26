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
          emptyMessage="받은 칭찬매너가 없어요"
          type={'positive'}
        />

        <hr style={{ width: '100%', border: '1px dashed #E5E7EB' }} />

        <MannerList
          evaluationTags={negativeTags}
          emptyMessage="받은 비매너가 없어요"
          type={'negative'}
        />
      </div>
    </>
  );
}
