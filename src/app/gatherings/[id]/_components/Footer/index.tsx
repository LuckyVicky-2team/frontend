'use client';

import styles from './Footer.module.scss';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import { usePostJoinGathering } from '@/api/queryHooks/gathering';
import { Dispatch, SetStateAction } from 'react';
import useModal from '@/hooks/useModal';
import Modal from '@/components/common/Modal';
import axios from 'axios';
import LoginModal from '@/components/common/Modal/LoginModal';

interface IGatheringFooterProps {
  id: number;
  title: string;
  type: 'LEADER' | 'PARTICIPANT' | 'NONE' | 'QUIT' | undefined;
  gatheringType?: 'FREE' | 'ACCEPT';
  setParticipantCount: Dispatch<SetStateAction<number>>;
  isMobile: boolean;
  isInitialSaved: 'Y' | 'N';
  state: 'PROGRESS' | 'COMPLETE' | 'FINISH';
  refetch: () => void;
}

export default function GatheringFooter({
  id,
  title,
  type,
  gatheringType = 'FREE',
  setParticipantCount,
  isMobile,
  isInitialSaved,
  state,
  refetch,
}: IGatheringFooterProps) {
  const router = useRouter();
  const { addToast } = useToast();

  const { mutate: joinMutate, isPending } = usePostJoinGathering();

  const {
    modalOpen: successModalOpen,
    handleModalOpen: handleSuccessModalOpen,
    handleModalClose: handleSuccessModalClose,
  } = useModal();

  const {
    modalOpen: finishModalOpen,
    handleModalOpen: handleFinishModalOpen,
    handleModalClose: handleFinishModalClose,
  } = useModal();

  const {
    modalOpen: loginModalOpen,
    handleModalOpen: handleLoginModalOpen,
    handleModalClose: handleLoginModalClose,
  } = useModal();

  const handleButtonClick = () => {
    if (type === undefined || type === 'NONE') {
      handleJoinButtonClick();
    }
    if (type === 'PARTICIPANT' || type === 'LEADER') {
      handleChatButtonClick();
    }
  };

  const handleJoinButtonClick = () => {
    const accesssToken = localStorage.getItem('accessToken');
    if (!accesssToken) {
      handleLoginModalOpen();
      return;
    }
    joinMutate(id, {
      onSuccess: _ => {
        setParticipantCount(prev => prev + 1);
        handleSuccessModalOpen();
      },
      onError: error => {
        // console.log(error);
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 4004 ||
            error.response?.status === 400
          ) {
            handleFinishModalOpen();
          }
          return;
        }
        addToast('참여하기 요청에 실패했습니다.', 'error');
      },
    });
  };

  const handleChatButtonClick = () => {
    addToast('아직 구현되지 않은 기능입니다.', 'error');
  };

  const handleGoToGatheringList = () => {
    router.push('/gatherings');
  };

  const handleGoToChatting = () => {
    addToast('아직 구현되지 않은 기능입니다.', 'error');
    // router.push('/Chatting');
  };

  const handleAlertLater = () => {
    handleSuccessModalClose();
  };

  return (
    <>
      <div className={styles.background}>
        <button
          type="button"
          disabled={isPending}
          className={styles.backButton}
          onClick={() => {
            router.back();
          }}>
          <Image
            src={'/assets/icons/chevron-left.svg'}
            alt="뒤로가기 이미지"
            width={36}
            height={36}
          />
        </button>
        <button
          className={
            type === 'LEADER' || type === 'PARTICIPANT'
              ? styles.ctaWhite
              : styles.cta
          }
          type="button"
          onClick={handleButtonClick}
          disabled={
            type === 'QUIT' ||
            state === 'COMPLETE' ||
            state === 'FINISH' ||
            isPending
          }>
          {state === 'PROGRESS' &&
            (!type || type === 'NONE') &&
            !isMobile &&
            '모임 참가하기'}
          {state === 'PROGRESS' && (!type || type === 'NONE') && isMobile && (
            <div>
              모임 <br /> 참가하기
            </div>
          )}
          {(type === 'LEADER' || type === 'PARTICIPANT') && '채팅방으로 가기'}
          {type === 'QUIT' && '참여할 수 없는 모임입니다.'}
          {state === 'COMPLETE' &&
            type !== 'LEADER' &&
            type !== 'PARTICIPANT' &&
            '모집 완료되었습니다. '}
          {state === 'FINISH' &&
            type !== 'LEADER' &&
            type !== 'PARTICIPANT' &&
            '종료된 모집입니다. '}
        </button>
        {
          type !== 'LEADER' && (
            <button className={styles.editButton} type="button">
              <SaveGatheringButton
                id={id}
                type="red"
                className={`${styles.zzimButton}`}
                rectangle
                isInitialSaved={isInitialSaved}
              />
            </button>
          )
          // ) : (
          //   <button className={styles.editButton} type="button">
          //     <Image
          //       src={'/assets/icons/pen.svg'}
          //       alt="수정 이미지"
          //       width={36}
          //       height={36}
          //     />
          //   </button>
          // )}
        }
      </div>
      <Modal
        modalOpen={successModalOpen}
        onClose={() => {
          handleSuccessModalClose();
          refetch();
        }}
        maxWidth={552}
        xButton>
        <div className={styles.modalBackground}>
          <p className={styles.title}>{title}</p>
          {gatheringType === 'FREE'
            ? '참여 완료 되었습니다.'
            : '신청 완료 되었습니다.'}
          {gatheringType === 'ACCEPT' && (
            <div className={styles.description}>
              <Image
                src={'/assets/icons/alert-triangle.svg'}
                alt={'주의 아이콘'}
                width={24}
                height={24}
              />
              <div
                style={{
                  flex: '1 1 0',
                  textAlign: 'center',
                  width: '318px',
                }}>
                {!isMobile ? (
                  <p>
                    해당 모임은 모임장의 권한이 필요해요. <br /> 모임이
                    개설되면, 따로 안내드릴게요.
                  </p>
                ) : (
                  <p>
                    해당 모임은 모임장의 권한이 필요해요. 모임이 개설되면, 따로
                    안내드릴게요.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.modalButtons}>
          <button
            type="button"
            onClick={handleGoToGatheringList}
            className={styles.modalFirstButton}>
            다른 모임방 둘러보기
          </button>
          {gatheringType === 'FREE' ? (
            <button
              type="button"
              onClick={handleGoToChatting}
              className={styles.modalSecondButton}>
              모임 채팅방 가기
            </button>
          ) : (
            <button
              type="button"
              onClick={handleAlertLater}
              className={styles.modalSecondButton}>
              나중에 개설 안내 받기
            </button>
          )}
        </div>
      </Modal>
      <Modal
        modalOpen={finishModalOpen}
        onClose={handleFinishModalClose}
        maxWidth={552}>
        <div className={styles.modalBackground}>
          <p className={styles.title}>해당 모임은 마감되었습니다.</p>
          다음에 만나요! 🙏
        </div>
        <button
          type="button"
          onClick={handleGoToGatheringList}
          className={styles.modalFullButton}>
          다른 모임방 둘러보기
        </button>
      </Modal>
      <LoginModal modalOpen={loginModalOpen} onClose={handleLoginModalClose} />
    </>
  );
}
