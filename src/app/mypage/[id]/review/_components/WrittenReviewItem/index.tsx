import React from 'react';
import Image from 'next/image';
import styles from './WrittenReviewItem.module.scss';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { IMeetingReviewProps } from '@/app/mypage/mockDataType';
import Rating from '@/components/common/Rating';

export default function WrittenReviewItem({ item }: IMeetingReviewProps) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <>
      <div key={item.id} className={styles.reviewItem}>
        <div className={styles.thumbnail}>
          <Image
            src={
              item.thumbnail === ''
                ? '/assets/images/bg_greenblue.png'
                : item.thumbnail
            }
            alt="thumbnail"
            fill
          />
        </div>
        <div className={styles.content}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          <p className={styles.date}>{item.gatheringDate}</p>
          <div onClick={handleModalOpen}>리뷰보기{`->`}</div>
        </div>

        <Modal modalOpen={modalOpen} onClose={handleModalClose}>
          <div className={styles.detailModal}>
            <div className={styles.modalHeader}>
              <h2>{item.title}</h2>
              <span>{item.gatheringDate}</span>
            </div>
            <p>{item.content}</p>

            <div className={styles.reviewList}>
              {item.reviewedUsers.map(user => (
                <div key={user.userId} className={styles.reviewedUser}>
                  <h4>{user.userName}</h4>
                  <Rating rating={user.rating} readable />
                  <div className={styles.tags}>
                    {user.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
