'use client';

import React from 'react';
import styles from './deleteModal.module.scss';
import { deleteMeeting } from '@/api/apis/mypageApis';
import axios from 'axios';
import { useToast } from '@/contexts/toastContext';

interface IOutModalProps {
  meetingId: string;
  meetingTitle: string;
  handleModalClose: () => void; // props 인터페이스 정의
  removeMeeting: (_id: string) => void; // 수정된 부분: 함수 타입으로 변경
}

export default function DeleteModal({
  handleModalClose,
  meetingId,
  meetingTitle,
  removeMeeting,
}: IOutModalProps & { removeMeeting: (_id: string) => void }) {
  const { addToast } = useToast();

  const HandleDeleteMeeting = async (id: string) => {
    try {
      await deleteMeeting(id); // API 호출
      addToast('모임을 삭제하였습니다.', 'success');
      removeMeeting(id); // 부모 상태 업데이트 호출
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          addToast('참가인원이 존재하여 삭제할수 없습니다', 'error');
        } else {
          alert(
            `오류가 발생했습니다: ${error.response.data.message || '알 수 없는 오류'}`
          );
        }
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
      // console.error('모임 삭제 중 오류 발생:', error);
    } finally {
      handleModalClose();
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
            onClick={() => HandleDeleteMeeting(meetingId)}>
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
