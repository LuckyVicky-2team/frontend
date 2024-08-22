'use client';
import React, { useState } from 'react';
import styles from './GatheringID.module.scss';
import ReviewWriteDetail from '../../_components/GatheringItem/ReviewWriteDetail';
import { gatheringList } from '@/app/mypage/mockData/mockData';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';

export default function SingleGathering({
  params,
}: {
  params: { gatheringId: number };
}) {
  const { modalOpen, handleModalClose, handleModalOpen } = useModal();
  const item = gatheringList.find(el => el.id === Number(params.gatheringId));
  const [participantId, setParticipantId] = useState<number>();
  const meetingParticipantList = item.participants.find(
    (el: { userName: string; userId: number }) => el.userId === participantId
  );

  const clickReview = (id: number) => {
    handleModalOpen();
    setParticipantId(id);
  };

  return (
    <>
      <div className={styles.modalHeader}>
        <div className={styles.titleAndDate} style={{ display: 'flex' }}>
          <h2>{item.title}</h2>
          <p>
            {item.city} {item.county}
          </p>
          <span>{item.gatheringDate}</span>
        </div>
      </div>

      <div className={styles.listContainer}>
        <div className={styles.participantslist}>
          {item.participants.map((user: any) => (
            <div key={user.userId} className={styles.user}>
              <h4>{user.userName}</h4>
              <button
                onClick={() => {
                  clickReview(user.userId);
                }}>
                리뷰하기
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal full modalOpen={modalOpen} onClose={handleModalClose}>
        <div className={styles.detailModal}>
          {meetingParticipantList && (
            <ReviewWriteDetail
              gatheringId={item.id}
              routerBackHandler={handleModalClose}
              name={meetingParticipantList.userName}
              id={meetingParticipantList.userId}
            />
          )}
        </div>
      </Modal>
    </>
  );
}
