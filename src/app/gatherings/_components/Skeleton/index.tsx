import styles from './Skeleton.module.scss';

interface ISkeletonProps {
  type?: 'default' | 'review';
}

export default function Skeleton({ type = 'default' }: ISkeletonProps) {
  return (
    <div
      className={styles.skeletonCard}
      style={{ transform: `${type === 'review' && 'translateY(-10%)'}` }}>
      <div
        className={styles.thumbnail}
        style={{ scale: `${type === 'review' && '0.8'}` }}
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.info}>
            <div className={styles.title} />
            <div className={styles.location} />
            <div className={styles.time}>
              <div className={styles.date} />
              <div className={styles.timeDetail} />
            </div>
          </div>
          {type === 'default' && <div className={styles.iconButton} />}
        </div>
        {type === 'default' && (
          <>
            <div className={styles.tagContainer}>
              <div className={styles.tag} />
              <div className={styles.tag} />
            </div>
            <div className={styles.gameContainer}>
              <div className={styles.game} />
              <div className={styles.game} />
            </div>
            <div className={styles.participants}>
              <div className={styles.participantDetails} />
              <div className={styles.progress} />
            </div>
          </>
        )}
        <div className={styles.seeDetail} />
      </div>
    </div>
  );
}
