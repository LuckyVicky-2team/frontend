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
  mode?: 'map' | 'default';
  page?: 'detail' | 'default';
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
  mode = 'default',
  page = 'default',
}: IPlaceListItemProps) {
  const addressParts = address.split(' ');

  return (
    <div
      className={`${isMobile ? styles.mobileItem : styles.item} ${className}`}>
      <div
        className={styles.nameArea}
        style={{
          flexDirection: 'row',
        }}>
        {index !== undefined && (
          <span className={styles.order}>{index + 1}</span>
        )}
        {placeURL ? (
          <Link
            href={placeURL}
            target="_blank"
            className={`${styles.name} ${styles.url} ${mode === 'map' && isMobile ? styles.mapItem : ''} ${page === 'detail' && isMobile ? styles.detailItem : ''}`}>
            {placeName}
          </Link>
        ) : (
          <div
            className={`${styles.name} ${mode === 'map' && isMobile ? styles.mapItem : ''} ${page === 'detail' && isMobile ? styles.detailItem : ''}`}>
            {placeName}
          </div>
        )}
      </div>
      <div
        className={`${styles.infoArea} ${index === undefined && styles.notIndexInfo} ${mode === 'map' && isMobile ? styles.mapItem : ''}`}
        style={{
          padding: isMobile
            ? '0 0 0 24px'
            : index === undefined
              ? '0'
              : '0 0 0 24px',
        }}>
        {isMobile ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
            <span
              className={`${styles.category} ${mode === 'map' && isMobile ? styles.mapItem : ''}`}>
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
        {distance && <div className={styles.distance}>{`${distance}km`}</div>}
      </div>
    </div>
  );
}
