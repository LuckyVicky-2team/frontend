import Link from 'next/link';
import styles from './PlaceListItem.module.scss';

interface IPlaceListItemProps {
  placeName: string;
  address: string;
  distance?: string;
  placeURL?: string;
  categoryName?: string;
  index?: number;
  isMobile: boolean;
  className?: string;
}

export default function PlaceListItem({
  placeName,
  address,
  distance,
  placeURL,
  categoryName,
  index,
  isMobile,
  className,
}: IPlaceListItemProps) {
  const addressParts = address.split(' ');

  return (
    <div
      className={`${isMobile ? styles.mobileItem : styles.item} ${className}`}>
      <div
        className={styles.nameArea}
        style={{
          flexDirection: isMobile ? 'column' : 'row',
        }}>
        {index !== undefined && (
          <span className={styles.order}>{index + 1}</span>
        )}
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
      </div>
      <div
        className={`${styles.infoArea} ${index === undefined && styles.notIndexInfo}`}
        style={{
          padding: isMobile ? '0' : index === undefined ? '0' : '0 0 0 42px',
        }}>
        {isMobile ? (
          <div
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
            <span className={styles.category}>
              {categoryName?.split(' > ').at(-1)}
            </span>
            <div className={styles.address}>
              {addressParts[0]} {addressParts[1]} {addressParts[2]}{' '}
              {addressParts[3]}
            </div>
          </div>
        ) : (
          <>
            <span className={styles.category}>
              {categoryName?.split(' > ').at(-1)}
            </span>
            <div className={styles.address}>{address}</div>
          </>
        )}
        {distance && (
          <div
            className={styles.distance}
            style={{
              justifyContent: isMobile ? 'center' : undefined,
            }}>{`${distance}km`}</div>
        )}
      </div>
    </div>
  );
}
