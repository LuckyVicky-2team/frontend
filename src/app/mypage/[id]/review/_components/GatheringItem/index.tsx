import styles from './GatheringItem.module.scss';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';
import { GatheringItemProps } from '@/app/mypage/mockDataType';

export default function GatheringItem({ item }: GatheringItemProps) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <div key={item.id} className={styles.gatheringItem}>
      <h3>{item.title}</h3>
      <p>{item.location}</p>
      <p>{item.gatheringDate}</p>
      <p>
        {item.participantCount}/{item.capacity}
      </p>
      <button onClick={handleModalOpen}>리뷰 작성하기</button>
      <Modal modalOpen={modalOpen} onClose={handleModalClose}>
        <div className={styles.detail}>참여한 멤버</div>
      </Modal>
    </div>
  );
}
