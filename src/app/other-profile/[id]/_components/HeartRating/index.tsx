import styles from './HeartRating.module.scss';
import HeartUnit from './HeartUnit';

interface IHeartRatingProps {
  rating: number;
  className?: string;
}

export default function HeartRating({ rating, className }: IHeartRatingProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.hearts}>
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <HeartUnit
              key={index}
              status={
                rating >= index + 1
                  ? 'full'
                  : rating >= index + 0.5
                    ? 'half'
                    : 'empty'
              }
            />
          );
        })}
      </div>
      <span className={styles.rating}>{rating}</span>
    </div>
  );
}
