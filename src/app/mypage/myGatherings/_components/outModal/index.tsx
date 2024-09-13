'use client';

import React from 'react';
import styles from './outModal.module.scss';
import { outMeeting } from '@/api/apis/mypageApis';
import { useToast } from '@/contexts/toastContext';

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
  const { addToast } = useToast();

  const HandleOutMeeting = async (id: string) => {
    try {
      const _response = await outMeeting(id); // API 호출
      addToast('성공적으로 모임을 나갔습니다.', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } finally {
    }
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalContent}>
        <h1>
          <span>{meetingTitle}</span>에서 나가시겠습니까?
        </h1>
        <div className={styles.btnWrap}>
          <button
            className={styles.ok}
            onClick={() => {
              HandleOutMeeting(meetingId);
              handleModalClose();
            }}>
            나갈래요
          </button>
          <button
            className={styles.no}
            onClick={() => {
              handleModalClose();
            }}>
            안나갈래요
          </button>
        </div>
      </div>
    </div>
  );
}
