import { Dispatch, Fragment, SetStateAction } from 'react';
import { IPlaceInfoResponse } from '@/types/kakao';
import PlaceListItem from './PlaceListItem';
import calculateDistance from '@/utils/calculateDistance';
import styles from './KakaoList.module.scss';

interface IKakaoListProps {
  list: IPlaceInfoResponse[];
  setItem: Dispatch<SetStateAction<IPlaceInfoResponse | undefined>>;
  setStep: Dispatch<SetStateAction<string>>;
  myPosition: { x: number; y: number } | undefined;
}

export default function KakaoList({
  list,
  setItem,
  setStep,
  myPosition,
}: IKakaoListProps) {
  return (
    <div className={`${styles.list}`}>
      <div className={styles.items}>
        {list.map((item, idx) => {
          const distance =
            myPosition &&
            calculateDistance(
              myPosition.x,
              myPosition.y,
              parseFloat(item.x),
              parseFloat(item.y)
            );
          item.distance = distance ? String(distance.toFixed(2)) : '';
          item.index = idx;
          return (
            <Fragment key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setItem(item);
                  setStep('map');
                }}
                className={styles.itemButton}>
                <PlaceListItem
                  index={idx}
                  placeName={item.place_name}
                  address={item.road_address_name || item.address_name}
                  distance={item.distance}
                  placeURL={item.place_url}
                  categoryName={item.category_name}
                />
              </button>
              {idx !== list.length - 1 && <hr className={styles.boundary} />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
