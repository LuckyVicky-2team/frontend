import styles from './index.module.scss';

interface IRecommendInfo {
  id: number;
  title: string;
  thumbnail: string;
  minPlaytime: number;
  maxPlaytime: number;
  genres: string[];
  minPeople: number;
  maxPeople: number;
}

interface SkeletonProps {
  recommendInfo: IRecommendInfo[]; // 배열 타입으로 지정
}

export default function Skeleton({ recommendInfo }: SkeletonProps) {
  const limitedRecommendations = recommendInfo.slice(0, 8) || [];
  return (
    <div className={styles.skeletonWrap}>
      {limitedRecommendations?.map((_, i) => {
        return (
          <div className={styles.item} key={i}>
            <div className={styles.img}></div>
            <div className={styles.info}></div>
          </div>
        );
      })}
    </div>
  );
}
