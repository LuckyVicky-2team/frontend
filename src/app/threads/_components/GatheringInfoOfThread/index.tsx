'use client';

import Image from 'next/image';
import Link from 'next/link';
import BackButton from '@/components/common/BackButton';
import styles from './GatheringInfoThread.module.scss';

type Participant = {
  userId: number;
  profileImage: string | null;
  nickname: string;
  type: string;
};

interface IGatheringInfoOfThreadProps {
  thumbnail: string;
  title: string;
  description: string;
  place: string;
  meetingId: number;
  participants: Participant[];
  className?: string;
}

export default function GatheringInfoOfThread({
  thumbnail,
  title,
  description,
  place,
  meetingId,
  participants,
  className,
}: IGatheringInfoOfThreadProps) {
  // eslint 오류 방지 위함
  console.log(participants);

  return (
    <div className={`${styles.container} ${className}`}>
      <BackButton className={styles.backButton} />
      <div className={styles.gatheringInfo}>
        <Link href={`/gatherings/${meetingId}`} className={styles.thumbnail}>
          <Image
            src={thumbnail}
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
            <div className={styles.content}>{description}</div>
          </div>
          <div className={styles.place}>{place}</div>
        </div>
      </div>
      <button>
        <Image
          src="/assets/icons/hamburgerIcon.svg"
          alt="참여자 목록"
          width={34}
          height={34}
        />
      </button>
    </div>
  );
}
