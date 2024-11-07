'use client';

import React from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { useMyReviewList } from '@/api/queryHooks/review';
import { ISingleMeetingResponseProps } from '@/types/response/ReviewRES';
import styles from './MyReviewItem.module.scss';
import GatheringItem from '../GatheringItem';

export default function MyReviewItem({
  data,
}: {
  data: ISingleMeetingResponseProps;
}) {
  const { meetingId, title } = data;
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();

  const { data: revieweeList } = useMyReviewList({
    meetingId: meetingId,
  });
  return (
    <>
      <div key={meetingId} className={styles.container}>
        <GatheringItem
          buttonName={'작성한 리뷰 보기'}
          data={data}
          modalOpen={handleModalOpen}
        />
        <div>
          <Modal
            xButton
            modalOpen={modalOpen}
            maxWidth={500}
            onClose={handleModalClose}>
            <div className={styles.detailModal}>
              <div className={styles.modalHeader}>
                <h2>{title}</h2>모임 리뷰
              </div>

              <div className={styles.reviewList}>
                {revieweeList?.map((reviewee: any) => (
                  <div key={reviewee.reviewId} className={styles.reviewedUser}>
                    <h4>{reviewee.revieweeName}</h4>
                    {/* <Rating rating={reviewee.rating} readable /> */}
                    {/* <h2>{reviewee.rating}</h2> */}
                    <div className={styles.tags}>
                      {reviewee.positiveTags.map(
                        (tag: string, index: number) => (
                          <span
                            key={index + '_positive'}
                            className={`${styles.tag} ${styles.positive}`}>
                            {tag}
                          </span>
                        )
                      )}
                      {reviewee.negativeTags.map(
                        (tag: string, index: number) => (
                          <span
                            key={index + '_nagative'}
                            className={`${styles.tag} ${styles.negative}`}>
                            {tag}
                          </span>
                        )
                      )}
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
