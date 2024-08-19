import styles from './ReceivedReviewItem.module.scss';
import { MannerList } from './MannerList';
import { IReceivedReviewItemProps } from '@/app/mypage/mockDataType';

export default function ReceivedReviewItem({
  goodManners,
  badManners,
}: IReceivedReviewItemProps) {
  return (
    <>
      <div className={styles.reviewItem}>
        <MannerList
          manners={goodManners}
          title="받은 매너 칭찬"
          icon="😊"
          emptyMessage="받은 칭찬매너가 없어요"
        />
        <MannerList
          manners={badManners}
          title="받은 비매너"
          icon="😟"
          emptyMessage="받은 비매너가 없어요"
        />
      </div>
    </>
  );
}
