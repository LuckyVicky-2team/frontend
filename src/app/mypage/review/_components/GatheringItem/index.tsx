import styles from './GatheringItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
interface IGatheringProps {
  thumbnail: string;
  title: string;
  city: string;
  county: string;
  gatheringDate: string;
  id: number;
  participants: any[];
}
export default function GatheringItem({
  // thumbnail,
  title,
  city,
  county,
  gatheringDate,
  id,
  // participants,
}: IGatheringProps) {
  return (
    <div className={styles.gatheringItem}>
      <div className={styles.thumbnail}>
        <Image
          src={'/assets/images/bg_greenblue.png'}
          alt="thumbnail"
          fill
          sizes={'100%'}
          priority
        />
      </div>
      <div className={styles.content}>
        <div>
          <h3>{title}</h3>
          <p>
            {city} {county}
          </p>
          <p>{gatheringDate}</p>
        </div>
        <Link href={`review/${id}`} className={styles.writeBtn}>
          리뷰 작성하기
        </Link>
      </div>
    </div>
  );
}
