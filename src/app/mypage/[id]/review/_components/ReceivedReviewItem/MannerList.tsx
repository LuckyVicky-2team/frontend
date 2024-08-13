import Image from 'next/image';
import styles from './MannerList.module.scss';

interface Manner {
  content: string;
  count: number;
  id: number;
}

interface MannerListProps {
  manners: Manner[];
  title: string;
  icon: string;
  emptyMessage: string;
}

export function MannerList({
  manners,
  title,
  icon,
  emptyMessage,
}: MannerListProps) {
  return (
    <div>
      <div className={styles.meetingName}>
        <span className={styles.icon}>{icon}</span> {title}
      </div>
      <div className={styles.tags}>
        {manners.length > 0 ? (
          manners.map(manner => (
            <div key={manner.id} className={styles.tagItem}>
              <span className={styles.tagContent}>{manner.content}</span>
              <span className={styles.tagCount}>
                <span className={styles.countIcon}>
                  <Image
                    src={'/assets/icons/users.svg'}
                    alt="user-icon"
                    width={15}
                    height={15}
                  />
                </span>
                {manner.count}
              </span>
            </div>
          ))
        ) : (
          <div className={styles.noManner}>{emptyMessage}</div>
        )}
      </div>
    </div>
  );
}
