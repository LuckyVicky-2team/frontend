import Image from 'next/image';
import styles from './MannerList.module.scss';

interface ITag {
  tagPhrase: string;
  count: number;
}

interface IMannerListProps {
  evaluationTags: ITag[];
  title: string;
  icon: string;
  emptyMessage: string;
}

export function MannerList({
  evaluationTags,
  title,
  icon,
  emptyMessage,
}: IMannerListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.meetingName}>
        <span className={styles.icon}>{icon}</span> {title}
      </div>
      <div className={styles.tags}>
        {evaluationTags?.length > 0 ? (
          evaluationTags.map((tag, idx) => (
            <div key={idx + '_evaluationTag'} className={styles.tagItem}>
              <span className={styles.tagContent}>{tag.tagPhrase}</span>
              <span className={styles.tagCount}>
                <span className={styles.countIcon}>
                  <Image
                    src={'/assets/icons/users.svg'}
                    alt="user-icon"
                    width={15}
                    height={15}
                  />
                </span>
                {tag.count}
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
