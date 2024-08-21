'use client';

import { axiosInstance } from '@/api/instance';
import styles from './Footer.module.scss';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';

interface IGatheringFooterProps {
  id: number;
  type: string | undefined;
}

export default function GatheringFooter({ id, type }: IGatheringFooterProps) {
  const router = useRouter();
  const { addToast } = useToast();

  const handleJoinButtonClick = () => {
    try {
      const data = axiosInstance.post('/meeting-participant/participation', {
        meetingId: id,
      });
      console.log(data);
    } catch (error) {
      addToast('참여하기 요청에 실패했습니다.', 'error');
    }
  };

  return (
    <div className={styles.background}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => {
          router.back();
        }}>
        <Image
          src={'/assets/icons/chevron-left.svg'}
          alt="수정 이미지"
          width={36}
          height={36}
        />
      </button>
      <button
        className={styles.cta}
        type="button"
        onClick={handleJoinButtonClick}>
        {!type && '모임 참가하기'}
        {(type === 'LEADER' || type === 'PARTICIPANT') && '채팅방으로 가기'}
      </button>
      {type !== 'LEADER' ? (
        <SaveGatheringButton
          id={id}
          type="red"
          className={`${styles.zzimButton}`}
          rectangle
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
