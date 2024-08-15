import Link from 'next/link';
import { IPlaceInfoResponse } from '@/types/kakao';
import styles from './PlaceListItem.module.scss';

interface IPlaceListItemProps {
  item: IPlaceInfoResponse;
  index?: number;
  className?: string;
}

export default function PlaceListItem({
  item,
  index = 0,
  className,
}: IPlaceListItemProps) {
  return (
    <div className={`${styles.item} ${className}`}>
      <div className={styles.nameArea}>
        <span className={styles.order}>{index + 1}</span>
        <Link href={item.place_url} target="_blank" className={styles.name}>
          {item.place_name}
        </Link>
        <span className={styles.category}>
          {item.category_name.split(' > ').at(-1)}
        </span>
      </div>
      <div className={styles.infoArea}>
        <div className={styles.address}>
          {item.road_address_name || item.address_name}
        </div>
        {item.distance && (
          <div className={styles.distance}>{`${item.distance}km`}</div>
        )}
      </div>
    </div>
  );
}
