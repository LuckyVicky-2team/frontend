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
  removeMeeting, // 부모 컴포넌트에서 전달받은 상태 업데이트 함수
}: IOutModalProps & { removeMeeting: (_id: string) => void }) {
  const { addToast } = useToast();

  const handleOutMeeting = async (id: string) => {
    try {
      const _response = await outMeeting(id); // API 호출
      addToast('성공적으로 모임을 나갔습니다.', 'success');
      removeMeeting(id); // 부모 상태 업데이트 호출
    } catch (error) {
      addToast('모임에서 나가는데 실패했습니다.', 'error');
    } finally {
      handleModalClose();
    }
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modalContent}>
        <h1>
          <span>{meetingTitle}</span>에서 나가시겠습니까?
          <p>모임에서 나가시면 더이상 같은 모임에는 참가 하실수 없습니다.</p>
        </h1>
        <div className={styles.btnWrap}>
          <button
            className={styles.ok}
            onClick={() => handleOutMeeting(meetingId)}>
            나갈래요
          </button>
          <button className={styles.no} onClick={() => handleModalClose()}>
            안나갈래요
          </button>
        </div>
      </div>
    </div>
  );
}
