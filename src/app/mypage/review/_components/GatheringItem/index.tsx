import styles from './GatheringItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { transDate } from '@/utils/common';
interface IGatheringProps {
  item: {
    thumbnail: string;
    title: string;
    city: string;
    county: string;
    gatheringDate: string;
    id: number;
    participants: any[];
  };
}

export default function GatheringItem({ item }: IGatheringProps) {
  const { title, thumbnail, city, county, id, gatheringDate } = item;

  const { mondthAndDay, time } = transDate(gatheringDate);
  const imageURL = thumbnail
    ? `${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
    : '/assets/images/emptyThumbnail.png';

  return (
    <div className={styles.outerLayer}>
      <div className={styles.innerLayer}>
        <div className={styles.thumbnail}>
          <Image
            src={imageURL}
            alt="thumbnail"
            width={142}
            height={194}
            layout={'responsive'}
            priority
          />
        </div>
        <div className={styles.content}>
          <div className={styles.detail}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.location}>
              <span>|</span> {city} {county}
            </p>
            <div className={styles.time}>
              <p>{mondthAndDay}</p>
              <p className={styles.timeDetail}>{time}</p>
            </div>
          </div>
          <Link href={`review/${id}`} className={styles.writeBtn}>
            리뷰 남기기
          </Link>
        </div>
      </div>
    </div>
  );
}
