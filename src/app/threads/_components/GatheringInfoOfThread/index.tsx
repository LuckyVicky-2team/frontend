'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '@/components/common/BackButton';
import Members from '@/app/gatherings/[id]/_components/Members';
import useModal from '@/hooks/useModal';
import { IParticipant } from '@/types/response/Gathering';
import styles from './GatheringInfoThread.module.scss';

interface IGatheringInfoOfThreadProps {
  thumbnail: string;
  title: string;
  description: string;
  place: string;
  meetingId: number;
  participants: IParticipant[];
  state: string;
  userId: number;
  className?: string;
}

export default function GatheringInfoOfThread({
  thumbnail,
  title,
  description,
  place,
  meetingId,
  participants,
  state,
  userId,
  className,
}: IGatheringInfoOfThreadProps) {
  const [isMobile, setIsMobile] = useState(false);
  const {
    modalOpen: profileModalOpen,
    handleModalOpen: handleProfileModalOpen,
    handleModalClose: handleProfileModalClose,
  } = useModal();

  const myType = participants.find(participant => {
    return participant.userId === userId;
  })?.type;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 439);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 로드 시 체크

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      <BackButton className={styles.backButton} />
      <div className={styles.gatheringInfo}>
        <Link href={`/gatherings/${meetingId}`} className={styles.thumbnail}>
          <Image
            src={
              thumbnail
                ? `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
                : '/assets/images/emptyThumbnail.png'
            }
            alt={title}
            fill
            style={{ objectFit: 'cover', borderRadius: '10px' }}
            unoptimized
            onError={e =>
              (e.currentTarget.src = '/assets/images/emptyThumbnail.png')
            }
          />
        </Link>
        <div className={styles.texts}>
          <div className={styles.contents}>
            <div className={styles.content}>{title}</div>
            <div className={styles.content}>{description.slice(3, -4)}</div>
          </div>
          <div className={styles.place}>{place}</div>
        </div>
      </div>
      <button onClick={handleProfileModalOpen}>
        <Image
          src="/assets/icons/hamburgerIcon.svg"
          alt="참여자 목록"
          width={34}
          height={34}
        />
      </button>
      <Members
        meetingId={meetingId}
        modalOpen={profileModalOpen}
        onClose={handleProfileModalClose}
        onOpen={handleProfileModalOpen}
        data={{
          userParticipantResponseList: participants,
          meetingState: state,
        }}
        isMobile={isMobile}
        myType={myType}
        bottomSheetOpen={'zero'}
        applyPlace="thread"
      />
    </div>
  );
}
