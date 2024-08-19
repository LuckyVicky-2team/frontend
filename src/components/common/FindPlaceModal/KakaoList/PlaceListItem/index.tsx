import Link from 'next/link';
import styles from './PlaceListItem.module.scss';

interface IPlaceListItemProps {
  placeName: string;
  address: string;
  distance?: string;
  placeURL?: string;
  categoryName?: string;
  index?: number;
  className?: string;
}

export default function PlaceListItem({
  placeName,
  address,
  distance,
  placeURL,
  categoryName,
  index,
  className,
}: IPlaceListItemProps) {
  return (
    <div className={`${styles.item} ${className}`}>
      <div className={styles.nameArea}>
        {index !== undefined && <span className={styles.order}>{index}</span>}
        {placeURL ? (
          <Link
            href={placeURL}
            target="_blank"
            className={`${styles.name} ${styles.url}`}>
            {placeName}
          </Link>
        ) : (
          <div className={styles.name}>{placeName}</div>
        )}
        <span className={styles.category}>
          {categoryName?.split(' > ').at(-1)}
        </span>
      </div>
      <div
        className={`${styles.infoArea} ${index === undefined && styles.notIndexInfo}`}>
        <div className={styles.address}>{address}</div>
        {distance && <div className={styles.distance}>{`${distance}km`}</div>}
      </div>
    </div>
  );
}
