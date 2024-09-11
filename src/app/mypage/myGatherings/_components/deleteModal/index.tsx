'use client';

import React from 'react';
import styles from './deleteModal.module.scss';
import { deleteMeeting } from '@/api/apis/mypageApis';

interface IOutModalProps {
  meetingId: string;
  meetingTitle: string;
  handleModalClose: () => void; // props 인터페이스 정의
}

export default function OutModal({
  handleModalClose,
  meetingId,
  meetingTitle,
}: IOutModalProps) {
  const HandleDeleteMeeting = async (id: string) => {
    try {
      const _response = await deleteMeeting(id); // API 호출
      alert('성공적으로 모임을 삭제했습니다');
      window.location.reload();
    } finally {
    }
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalContent}>
        <h1>
          <span>{meetingTitle}</span>를 정말 삭제하시겠습니까?
        </h1>
        <div className={styles.btnWrap}>
          <button
            className={styles.ok}
            onClick={() => {
              HandleDeleteMeeting(meetingId);
            }}>
            네, 삭제할게요
          </button>
          <button
            className={styles.no}
            onClick={() => {
              handleModalClose();
            }}>
            아니오, 안할게요
          </button>
        </div>
      </div>
    </div>
  );
}
