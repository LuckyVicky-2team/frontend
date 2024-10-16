'use client';

import Image from 'next/image';
import styles from './TalkListItem.module.scss';
import formatTimeDiff from '@/utils/formatTimeDiff';

interface ITalkListProps {
  item: {
    id: number;
    profileImage: string;
    nickname: string;
    contents: string;
    createdAt: string;
  };
}

export default function TalkListItem({ item }: ITalkListProps) {
  const processedDate = formatTimeDiff(item.createdAt);

  return (
    <div className={styles.item}>
      <div className={styles.imageArea}>
        <Image
          src={item.profileImage}
          alt={item.nickname}
          width={68}
          height={68}
          className={styles.profileImage}
          unoptimized
          onError={e =>
            (e.currentTarget.src = '/assets/icons/default-profile.svg')
          }
        />
      </div>
      <div className={styles.textArea}>
        <div className={styles.nameSection}>{item.nickname}</div>
        <div className={styles.messageSection}>
          <div className={styles.contents}>{item.contents}</div>
          <div className={styles.createdAt}>{processedDate}</div>
        </div>
      </div>
    </div>
  );
}
