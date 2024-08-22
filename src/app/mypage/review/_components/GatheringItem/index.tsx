import styles from './GatheringItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
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
  const imageURL = thumbnail
    ? `https//${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
    : '/assets/images/emptyThumbnail.png';

  return (
    <div className={styles.gatheringItem}>
      <div className={styles.thumbnail}>
        <Image src={imageURL} alt="thumbnail" fill sizes={'100%'} priority />
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
