import styles from './MannerBar.module.scss';

interface IMannerBarProps {
  rating: number;
}

export default function MannerBar({ rating }: IMannerBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${rating * 20}%` }}></div>
      </div>
      <div className={styles.rating} style={{ left: `${rating * 14}%` }}>
        {rating}
      </div>
    </div>
  );
}
