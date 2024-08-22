'use client';

import React from 'react';
import Image from 'next/image';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { IMeetingReviewProps } from '@/app/mypage/mockData/mockDataType';
import Rating from '@/components/common/Rating';
import styles from './MyReviewItem.module.scss';

export default function MyReviewItem({ item }: IMeetingReviewProps) {
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
            sizes={'100%'}
          />
        </div>
        <div className={styles.content}>
          <h3>{item.title}</h3>

          <p className={styles.date}>{item.gatheringDate}</p>
          <div onClick={handleModalOpen}>리뷰보기{`->`}</div>
        </div>
        <div>
          <Modal
            modalOpen={modalOpen}
            maxWidth={500}
            onClose={handleModalClose}>
            <div className={styles.detailModal}>
              <div className={styles.modalHeader}>
                <h2>{item.title}</h2>
                <span>{item.gatheringDate}</span>
              </div>

              <div className={styles.reviewList}>
                {item.reviewedUsers?.map(user => (
                  <div key={user.userId} className={styles.reviewedUser}>
                    <h4>{user.userName}</h4>
                    <Rating rating={user.rating} readable />
                    <div className={styles.tags}>
                      {user.positiveTags.map((tag, index) => (
                        <span
                          key={index + '_positive'}
                          className={`${styles.tag} ${styles.positive}`}>
                          {tag}
                        </span>
                      ))}
                      {user.negativeTags.map((tag, index) => (
                        <span
                          key={index + '_nagative'}
                          className={`${styles.tag} ${styles.negative}`}>
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
      </div>
    </>
  );
}
