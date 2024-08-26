'use client';

import React from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import { IMeetingReviewProps } from '@/app/mypage/mockData/mockDataType';
// import Rating from '@/components/common/Rating';
import styles from './MyReviewItem.module.scss';
import GatheringItem from '../GatheringItem';

export default function MyReviewItem({ item }: IMeetingReviewProps) {
  const { modalOpen, handleModalOpen, handleModalClose } = useModal();
  /*
    1.myReivewItem modal 연결 ok
    //api 생성 후 연결
    2. 초기화 버튼
    새로만들기 버튼 클릭시 회원/비회원 구별
    3. selectbox ui upate
    4. review ui
    5. review api 연동
*/
  return (
    <>
      <div key={item.id} className={styles.container}>
        <GatheringItem
          buttonName={'보낸 리뷰 보기'}
          data={item}
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
                <h2>{item.title}</h2>모임 리뷰
              </div>

              <div className={styles.reviewList}>
                {item.reviewee?.map((user: any) => (
                  <div key={user.reviewId} className={styles.reviewedUser}>
                    <h4>{user.revieweeName}</h4>
                    {/* <Rating rating={user.rating} readable /> */}
                    {/* <h2>{user.rating}</h2> */}
                    <div className={styles.tags}>
                      {user.positiveTags.map((tag: string, index: number) => (
                        <span
                          key={index + '_positive'}
                          className={`${styles.tag} ${styles.positive}`}>
                          {tag}
                        </span>
                      ))}
                      {user.negativeTags.map((tag: string, index: number) => (
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
