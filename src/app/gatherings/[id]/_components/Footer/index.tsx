'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  usePatchCompleteGathering,
  usePostJoinGathering,
} from '@/api/queryHooks/gathering';
import useScreenWidth from '@/hooks/useScreenWidth';
import useScreenHeight from '@/hooks/useScreenHeight';
import { QueryKey } from '@/utils/QueryKey';
import { useToast } from '@/contexts/toastContext';
import useModal from '@/hooks/useModal';
import styles from './Footer.module.scss';
import Modal from '@/components/common/Modal';
import LoginModal from '@/components/common/Modal/LoginModal';
import Spinner from '@/components/common/Spinner';

interface IGatheringFooterProps {
  id: number;
  title: string;
  type: 'LEADER' | 'PARTICIPANT' | 'NONE' | 'QUIT' | undefined;
  // gatheringType?: 'FREE' | 'ACCEPT';
  participantCount: number;
  setParticipantCount: Dispatch<SetStateAction<number>>;
  limitParticipant: number;
  isInitialSaved: 'Y' | 'N';
  state: 'PROGRESS' | 'COMPLETE' | 'FINISH';
  refetch: () => void;
  isPendingMe: boolean;
  meetingDatetime?: string;
}

export default function GatheringFooter({
  id,
  title,
  type,
  // gatheringType = 'FREE',
  participantCount,
  setParticipantCount,
  limitParticipant,
  isInitialSaved,
  state,
  refetch,
  isPendingMe,
  meetingDatetime,
}: IGatheringFooterProps) {
  const router = useRouter();
  const { addToast } = useToast();
  const { mutate: joinMutate, isPending } = usePostJoinGathering();
  const { mutate: completeMutate } = usePatchCompleteGathering();
  const queryClient = useQueryClient();
  const progressGathering =
    meetingDatetime && new Date(meetingDatetime) > new Date();

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

  const { isMobile, screenWidth } = useScreenWidth();
  const screenHeight = useScreenHeight();

  const handleButtonClick = () => {
    if (type === undefined || type === 'NONE') {
      handleJoinButtonClick();
    }
    if (type === 'PARTICIPANT' || type === 'LEADER') {
      handleChatButtonClick();
    }
  };

  const handleJoinButtonClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      handleLoginModalOpen();
      return;
    }
    joinMutate(id, {
      onSuccess: _ => {
        setParticipantCount(prev => prev + 1);
        refetch();
        handleSuccessModalOpen();
        queryClient.invalidateQueries({
          queryKey: QueryKey.GATHERING.LIST({}),
          refetchType: 'all',
        });
        if (participantCount + 1 === limitParticipant) {
          completeMutate(id, {
            onError: _ => {
              addToast('모집 완료 요청에 실패했습니다.', 'error');
            },
          });
        }
      },
      onError: error => {
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
    router.push(`/threads/${id - 90}?meeting=${id}`);
  };

  const handleGoToGatheringList = () => {
    router.push('/gatherings');
  };

  // const handleAlertLater = () => {
  //   handleSuccessModalClose();
  // };

  useEffect(() => {
    const footer = document.querySelector(
      `.${styles.background}`
    ) as HTMLDivElement;
    const safeAreaBottom =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--safe-area-inset-bottom'
        ) || '0',
        10
      ) || 0; // 기본값 0 추가

    footer.style.bottom = `${safeAreaBottom}px`; // Safe Area 처리
  }, [screenHeight]);

  return (
    <>
      <footer
        className={styles.background}
        style={{
          height: `${(screenWidth * 100) / 600}px`,
          maxHeight: '100px',
        }}>
        <button
          type="button"
          disabled={isPending}
          className={styles.backButton}
          style={{
            height: `${(screenWidth * 70) / 600}px`,
            width: `${(screenWidth * 70) / 600}px`,
            maxHeight: '70px',
            maxWidth: '70px',
          }}
          onClick={() => {
            router.back();
          }}>
          <Image
            src={'/assets/icons/chevron-left.svg'}
            alt="뒤로가기 이미지"
            width={isMobile ? 20 : 36}
            height={isMobile ? 20 : 36}
          />
        </button>
        <button
          className={
            isPendingMe
              ? styles.ctaNone
              : type === 'LEADER' || type === 'PARTICIPANT'
                ? styles.ctaWhite
                : styles.cta
          }
          style={{
            height: `${(screenWidth * 70) / 600}px`,
            maxHeight: '70px',
          }}
          type="button"
          onClick={handleButtonClick}
          disabled={
            type === 'QUIT' ||
            (state === 'COMPLETE' &&
              type !== 'LEADER' &&
              type !== 'PARTICIPANT') ||
            (state === 'FINISH' &&
              type !== 'LEADER' &&
              type !== 'PARTICIPANT') ||
            isPending ||
            isPendingMe
          }>
          {isPendingMe && <Spinner />}
          {!isPendingMe &&
            state === 'PROGRESS' &&
            (!type || type === 'NONE') &&
            '모임 참가하기'}
          {!isPendingMe &&
            (type === 'LEADER' || type === 'PARTICIPANT') &&
            '채팅방으로 가기'}
          {!isPendingMe && type === 'QUIT' && '참여할 수 없는 모임입니다.'}
          {!isPendingMe &&
            state === 'COMPLETE' &&
            type !== 'LEADER' &&
            type !== 'PARTICIPANT' &&
            '모집 완료되었습니다. '}
          {!isPendingMe &&
            state === 'FINISH' &&
            type !== 'LEADER' &&
            type !== 'PARTICIPANT' &&
            '종료된 모집입니다. '}
        </button>

        {type === 'LEADER' && progressGathering && (
          <button
            className={styles.editButton}
            style={{
              height: `${(screenWidth * 70) / 600}px`,
              width: `${(screenWidth * 70) / 600}px`,
              maxHeight: '70px',
              maxWidth: '70px',
            }}
            type="button"
            onClick={() => {
              router.push(`${id}/edit`);
            }}>
            <Image
              src={'/assets/icons/pen.svg'}
              alt="수정 이미지"
              width={isMobile ? 20 : 36}
              height={isMobile ? 20 : 36}
            />
          </button>
        )}
        {type !== 'LEADER' && (
          // <button
          //   className={styles.editButton}
          //   type="button"
          //   style={{
          //     height: `${(screenWidth * 88) / 600}px`,
          //     width: `${(screenWidth * 80) / 600}px`,
          //   }}>
          <SaveGatheringButton
            id={id}
            type="red"
            className={`${styles.zzimButton}`}
            rectangle
            screenWidth={screenWidth}
            isInitialSaved={isInitialSaved}
          />
          //</button>
        )}
      </footer>
      <Modal
        modalOpen={successModalOpen}
        onClose={() => {
          handleSuccessModalClose();
        }}
        maxWidth={300}
        xButton>
        <div
          className={styles.modalBackground}
          // style={{
          // height: `${screenWidth * 0.3}px`,
          // maxHeight: '130px',
          // gap: `min(16px, ${(screenWidth * 16) / 600}px)`,
          // }}>
        >
          <p className={styles.title}>{title}</p>
          참여 완료 되었습니다.
          {/* {gatheringType === 'ACCEPT' && (
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
          )} */}
        </div>
        <div
          className={styles.modalButtons}
          // style={{ height: `${screenWidth * 0.15}px`, maxHeight: '75px' }}
        >
          <button
            type="button"
            onClick={handleGoToGatheringList}
            className={styles.modalFirstButton}
            // style={{ height: `${screenWidth * 0.15}px`, maxHeight: '75px' }}
          >
            다른 모임방 둘러보기
          </button>

          <button
            type="button"
            onClick={handleChatButtonClick}
            className={styles.modalSecondButton}
            // style={{ height: `${screenWidth * 0.15}px`, maxHeight: '75px' }}
          >
            모임 채팅방 가기
          </button>
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
