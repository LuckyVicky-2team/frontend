import Image from 'next/image';
import styles from './ThreadListItem.module.scss';

interface IThreadsListItemProps {
  profileImage: string;
  name: string;
  participantsCount: number;
  recentMessage: {
    contents: string;
    createdAt: string;
  };
  unreadCount: number;
}

export default function ThreadListItem({
  profileImage,
  name,
  participantsCount,
  recentMessage,
  unreadCount,
}: IThreadsListItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.imageArea}>
        <Image
          src={profileImage}
          alt={name}
          width={42}
          height={42}
          className={styles.profileImage}
        />
      </div>
      <div className={styles.textArea}>
        <div className={styles.nameSection}>
          <div className={styles.name}>
            {name}
            <span className={styles.participantsCount}>
              {participantsCount}
            </span>
          </div>
          <div className={styles.createdAt}>{recentMessage.createdAt}</div>
        </div>
        <div className={styles.contentSection}>
          {recentMessage.contents}
          {unreadCount !== 0 && (
            <div className={styles.unreadCount}>{unreadCount}</div>
          )}
        </div>
      </div>
    </div>
  );
}
