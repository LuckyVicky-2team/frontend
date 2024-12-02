import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { transDate } from '@/utils/common';
import styles from './GatheringItem.module.scss';

interface IGatheringProps {
  buttonName: string;
  href?: string;
  modalOpen?: () => void;
  data: {
    thumbnail: string;
    title: string;
    city: string;
    county: string;
    meetingDate: string;
    meetingId: number;
  };
}
const DEFAULT_IMAGES = [
  '/assets/images/emptyGameThumbnail.png',
  '/assets/images/emptyThumbnail.png',
];

export default function GatheringItem({
  data,
  href,
  buttonName,
  modalOpen,
}: IGatheringProps) {
  const { title, thumbnail, city, county, meetingDate } = data;

  const [imgSrc, setImgSrc] = useState<string>(
    `https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}/${thumbnail}`
  );
  const { mondthAndDay, time } = transDate(meetingDate);

  const handleImageError = () => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
    setImgSrc(DEFAULT_IMAGES[randomIndex]);
  };
  return (
    <div className={styles.outerLayer}>
      <div className={styles.innerLayer}>
        <div className={styles.thumbnail}>
          <Image
            src={imgSrc}
            alt="thumbnail"
            fill
            priority
            onError={handleImageError}
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
          <div className={styles.button}>
            {href ? (
              <Link href={href} className={styles.writeBtn}>
                {buttonName}
              </Link>
            ) : (
              <button onClick={modalOpen} className={styles.writeBtn}>
                {buttonName}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
