'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import formatTimeDiff from '@/utils/formatTimeDiff';
import { IChattingsContent } from '@/types/response/ChatroomsRES';
import { IParticipant } from '@/types/response/Gathering';
import styles from './TalkListItem.module.scss';

interface ITalkListProps {
  item: IChattingsContent;
  userId: number;
  participants: IParticipant[];
}

export default forwardRef<HTMLDivElement, ITalkListProps>(function TalkListItem(
  { item, userId, participants }: ITalkListProps,
  ref
) {
  const processedDate = formatTimeDiff(item.sendDatetime);
  const memberData = participants.find(
    member => +item.userId === member.userId
  );
  const isMyTalk = userId === +item.userId;

  return (
    <div className={styles.item} ref={ref}>
      {isMyTalk || (
        <div className={styles.imageArea}>
          <Link href={`/other-profile/${item.userId}`}>
            <Image
              src={
                `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${memberData?.profileImage}` ||
                '/assets/icons/default-profile.svg'
              }
              alt={String(item.userId)}
              fill
              className={styles.profileImage}
              unoptimized
              onError={e =>
                (e.currentTarget.src = '/assets/icons/default-profile.svg')
              }
            />
          </Link>
        </div>
      )}
      <div className={styles.textArea}>
        {isMyTalk || (
          <div className={styles.nameSection}>
            {memberData?.nickname ?? '추방된 멤버'}
          </div>
        )}
        <div
          className={`${styles.messageSection} ${isMyTalk && styles.myTalk}`}>
          <div className={styles.contents}>{item.content}</div>
          <div className={styles.createdAt}>{processedDate}</div>
        </div>
      </div>
    </div>
  );
});
