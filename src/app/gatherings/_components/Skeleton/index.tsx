import styles from './Skeleton.module.scss';

export default function Skeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.thumbnail} />
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
          <div className={styles.iconButton} />
        </div>
        <div className={styles.tagContainer}>
          <div className={styles.tag} />
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
        <div className={styles.seeDetail} />
      </div>
    </div>
  );
}
