'use client';

import { KeyboardEvent, useState } from 'react';
import { IPlaceInfo } from '@/types/kakao';
import PlaceSearchBar from './PlaceSearchBar';
import PlaceListItem from './PlaceListItem';
import styles from './KakaoList.module.scss';

interface IKakaoListProps {
  className?: string;
}

export default function KakaoList({ className }: IKakaoListProps) {
  const [places, setPlaces] = useState<IPlaceInfo[]>([]);

  const handleSearchPlaces = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;

      if (!targetValue) {
        setPlaces([]);
        return;
      }

      const keyword = `${targetValue} 보드카페`;

      window.kakao.maps.load(() => {
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(
          keyword,
          (data: IPlaceInfo[], status: 'OK' | 'ERROR' | 'ZERO_RESULT') => {
            console.log(status);
            if (status === window.kakao.maps.services.Status.OK) {
              setPlaces(data);
            } else if (
              status === window.kakao.maps.services.Status.ZERO_RESULT
            ) {
              setPlaces([]);
            } else if (status === window.kakao.maps.services.Status.ERROR) {
              console.log('error');
            }
          }
        );
      });
    }
  };

  return (
    <div className={`${styles.list} ${className}`}>
      <PlaceSearchBar onKeyUp={handleSearchPlaces} />
      <div className={styles.items}>
        {places.map((place, idx) => {
          return <PlaceListItem key={place.id} index={idx} item={place} />;
        })}
      </div>
    </div>
  );
}
