import Image from 'next/image';
import formatTimeDiff from '@/utils/formatTimeDiff';
import styles from './ThreadListItem.module.scss';

interface IThreadsListItemProps {
  thumbnail: string | null;
  name: string;
  recentMessage: string | null;
  lastSendDateTime: string | null;
}

export default function ThreadListItem({
  thumbnail,
  name,
  recentMessage,
  lastSendDateTime,
}: IThreadsListItemProps) {
  const recentMessageTime =
    lastSendDateTime && formatTimeDiff(lastSendDateTime);

  return (
    <div className={styles.item}>
      <div className={styles.imageArea}>
        <Image
          src={
            thumbnail
              ? `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
              : '/assets/images/emptyThumbnail.png'
          }
          alt={name}
          width={68}
          height={68}
          className={styles.profileImage}
          unoptimized
          onError={e =>
            (e.currentTarget.src = '/assets/images/emptyThumbnail.png')
          }
        />
      </div>
      <div className={styles.textArea}>
        <div className={styles.nameSection}>
          <div className={styles.name}>{name}</div>
          <div className={styles.createdAt}>{recentMessageTime}</div>
        </div>
        <div className={styles.contentSection}>
          <p className={styles.recentMessage}>
            {recentMessage || '최근의 대화가 없습니다.'}
          </p>
        </div>
      </div>
    </div>
  );
}
