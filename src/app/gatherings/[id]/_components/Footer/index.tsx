'use client';

import styles from './Footer.module.scss';
import SaveGatheringButton from '@/components/common/SaveGatheringButton';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IGatheringFooterProps {
  id: number;
  // isSaved: boolean;
  // setSaveItem: (_newValue: number) => void;
  type: string | undefined;
}

export default function GatheringFooter({ id, type }: IGatheringFooterProps) {
  const router = useRouter();
  return (
    <div className={styles.background}>
      <div>
        <button
          className={styles.backButton}
          onClick={() => {
            router.back;
          }}>
          <Image
            src={'/assets/icons/pen.svg'}
            alt="수정 이미지"
            width={36}
            height={36}
          />
        </button>
        <div className={styles.cta}>
          {!type && '모임 참가하기'}
          {(type === 'LEADER' || type === 'PARTICIPANT') && '채팅방으로 가기'}
        </div>
        {type !== 'LEADER' ? (
          <SaveGatheringButton
            id={id}
            type="red"
            className={`${styles.zzimButton}`}
            rectangle
          />
        ) : (
          <div className={styles.editButton}></div>
        )}
      </div>
    </div>
  );
}
