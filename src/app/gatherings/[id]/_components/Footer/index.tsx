import BackButton from '@/components/common/BackButton';
import styles from './Footer.module.scss';
import IconButton from '@/components/common/IconButton';

interface IGatheringFooterProps {
  id: number;
  isSaved: boolean;
  setSaveItem: (_newValue: number) => void;
  type: 'none' | 'leader' | 'member';
}

export default function GatheringFooter({
  id,
  isSaved,
  setSaveItem,
  type,
}: IGatheringFooterProps) {
  return (
    <div className={styles.background}>
      {type === 'none' && (
        <div>
          <BackButton />
          <div className={styles.cta}>모임 참가하기</div>
          <IconButton
            size="medium"
            imgUrl={
              isSaved
                ? '/assets/mainImages/heart_fill_ico.svg'
                : '/assets/icons/ic_heart.svg'
            }
            clickIconButtonHandler={() => setSaveItem(id)}
          />
        </div>
      )}
      <button type="button">(비멤버) 모임 참여하기</button>
      <button type="button">(멤버) 채팅방으로 가기</button>
      <button type="button">
        (마스터) 모임 삭제하기+ 채팅방으로 가기+ 모집 완료
      </button>
    </div>
  );
}
