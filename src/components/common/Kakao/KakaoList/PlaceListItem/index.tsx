import { IPlaceInfo } from '@/types/kakao';
import styles from './PlaceListItem.module.scss';
import Link from 'next/link';

interface IPlaceListItemProps {
  item: IPlaceInfo;
  index: number;
}

export default function PlaceListItem({ item, index }: IPlaceListItemProps) {
  return (
    <div className={styles.item}>
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
        <div className={styles.address}>{item.road_address_name}</div>
        <div className={styles.otherInfo}>
          {`${+item.distance / 100}km`}
          {item.phone && <span className={styles.phone}>{item.phone}</span>}
        </div>
      </div>
    </div>
  );
}
