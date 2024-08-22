'use client';

import styles from './Footer.module.scss';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import { usePostJoinGathering } from '@/api/queryHooks/gathering';
import { Dispatch, SetStateAction } from 'react';

interface IGatheringFooterProps {
  id: number;
  type: 'LEADER' | 'PARTICIPANT' | 'NONE' | 'QUIT' | undefined;
  setParticipantCount: Dispatch<SetStateAction<number>>;
  isMobile: boolean;
  isInitialSaved: 'Y' | 'N';
  state: 'PROGRESS' | 'COMPLETE' | 'FINISH';
}

export default function GatheringFooter({
  id,
  type,
  setParticipantCount,
  isMobile,
  isInitialSaved,
  state,
}: IGatheringFooterProps) {
  const router = useRouter();
  const { addToast } = useToast();

  const { mutate: joinMutate, isPending } = usePostJoinGathering();

  const handleButtonClick = () => {
    if (type === undefined || type === 'NONE') {
      handleJoinButtonClick();
    }
    if (type === 'PARTICIPANT' || type === 'LEADER') {
      handleChatButtonClick();
    }
  };

  const handleJoinButtonClick = () => {
    joinMutate(id, {
      onSuccess: () => {
        console.log('참여하기 성공!');
        setParticipantCount(prev => prev + 1);
      },
      onError: error => {
        console.log(error);
        addToast('참여하기 요청에 실패했습니다.', 'error');
      },
    });
  };

  const handleChatButtonClick = () => {
    addToast('아직 구현되지 않은 기능입니다.', 'error');
  };

  return (
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
          type === 'QUIT' || state === 'COMPLETE' || state === 'FINISH'
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
      {type !== 'LEADER' ? (
        <SaveGatheringButton
          id={id}
          type="red"
          className={`${styles.zzimButton}`}
          rectangle
          isInitialSaved={isInitialSaved}
        />
      ) : (
        <button className={styles.editButton} type="button">
          <Image
            src={'/assets/icons/pen.svg'}
            alt="수정 이미지"
            width={36}
            height={36}
          />
        </button>
      )}
    </div>
  );
}
