import Image from 'next/image';
import styles from './MannerList.module.scss';

interface ITag {
  tagPhrase: string;
  count: number;
}

interface IMannerListProps {
  type: 'positive' | 'negative';
  evaluationTags: ITag[];
  emptyMessage: string;
}

export function MannerList({
  evaluationTags,
  emptyMessage,
  type,
}: IMannerListProps) {
  return (
    <div className={styles.tags}>
      {evaluationTags?.length > 0 ? (
        evaluationTags.map((tag, idx) => (
          <div key={idx + '_evaluationTag'} className={styles.tagItem}>
            <div className={styles.tagCount}>
              <span className={styles.countIcon}>
                <Image
                  src={'/assets/icons/users.svg'}
                  alt="user-icon"
                  width={20}
                  height={20}
                />
              </span>
              {tag.count}
            </div>
            <div data-tagtype={type} className={styles.tagContent}>
              <p>{tag.tagPhrase}</p>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.noManner}>{emptyMessage}</div>
      )}
    </div>
  );
}
