'use client';

import Image from 'next/image';
import formatTimeDiff from '@/utils/formatTimeDiff';
import { IChattingsContent } from '@/types/response/ChatroomsRES';
import { IParticipant } from '@/types/response/Gathering';
import styles from './TalkListItem.module.scss';

interface ITalkListProps {
  item: IChattingsContent;
  userId: number;
  participants: IParticipant[];
}

export default function TalkListItem({
  item,
  userId,
  participants,
}: ITalkListProps) {
  const processedDate = formatTimeDiff(item.sendDatetime);
  const memberData = participants.find(
    member => +item.userId === member.userId
  );

  console.log(userId);

  return (
    <div className={styles.item}>
      <div className={styles.imageArea}>
        <Image
          src={
            `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${memberData?.profileImage}` ||
            '/assets/icons/default-profile.svg'
          }
          alt={String(item.userId)}
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
        <div className={styles.nameSection}>{memberData?.nickname}</div>
        <div className={styles.messageSection}>
          <div className={styles.contents}>{item.content}</div>
          <div className={styles.createdAt}>{processedDate}</div>
        </div>
      </div>
    </div>
  );
}
