import Image from 'next/image';
import styles from './ThreadListItem.module.scss';
import formatTimeDiff from '@/utils/formatTimeDiff';

interface IThreadsListItemProps {
  profileImage: string;
  name: string;
  recentMessage: {
    contents: string;
    createdAt: string;
  };
  unreadCount: number;
}

export default function ThreadListItem({
  profileImage,
  name,
  recentMessage,
  unreadCount,
}: IThreadsListItemProps) {
  const recentMessageTime =
    recentMessage && formatTimeDiff(recentMessage.createdAt);

  return (
    <div className={styles.item}>
      <div className={styles.imageArea}>
        <Image
          src={profileImage}
          alt={name}
          width={68}
          height={68}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.textArea}>
        <div className={styles.nameSection}>
          <div className={styles.name}>{name}</div>
          <div className={styles.createdAt}>{recentMessageTime}</div>
        </div>
        <div className={styles.contentSection}>
          <p className={styles.recentMessage}>{recentMessage.contents}</p>
          {unreadCount !== 0 && (
            <div className={styles.unreadCount}>{unreadCount}</div>
          )}
        </div>
      </div>
    </div>
  );
}
