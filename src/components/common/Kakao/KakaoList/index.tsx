'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import { IPlaceInfo, StatusType } from '@/types/kakao';
import PlaceSearchBar from './PlaceSearchBar';
import PlaceListItem from './PlaceListItem';
import styles from './KakaoList.module.scss';
import getCurrentCoordinate from '@/api/geolocationApi';
import calculateDistance from '@/utils/calculateDistance';
import KakaoMap from '../KakaoMap';

interface IKakaoListProps {
  className?: string;
}

export default function KakaoList({ className }: IKakaoListProps) {
  const [places, setPlaces] = useState<IPlaceInfo[]>([]);
  const [myPosition, setMyPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [selectedPlace, setSelectedPlace] = useState<IPlaceInfo | null>(null);

  const handleSearchPlaces = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;

      if (!targetValue) {
        setPlaces([]);
        return;
      }

      const keyword = `${targetValue}`;

      window.kakao.maps.load(() => {
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(
          keyword,
          (data: IPlaceInfo[], status: StatusType) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setPlaces(data);
            } else if (
              status === window.kakao.maps.services.Status.ZERO_RESULT
            ) {
              setPlaces([]);
            } else if (status === window.kakao.maps.services.Status.ERROR) {
              throw new Error('리스트를 불러올 수 없습니다.');
            }
          },
          { size: 5 }
        );
      });
    }
  };

  useEffect(() => {
    const getPosition = async () => {
      const myPosition = await getCurrentCoordinate();
      setMyPosition(myPosition);
    };

    getPosition();
  }, []);

  return (
    <div className={`${styles.list} ${className}`}>
      <PlaceSearchBar onKeyUp={handleSearchPlaces} />
      <div className={styles.items}>
        {places.map((place, idx) => {
          const distance = calculateDistance(
            myPosition.x,
            myPosition.y,
            parseFloat(place.x),
            parseFloat(place.y)
          );
          place.distance = String(distance.toFixed(2));
          return (
            <button
              onClick={() => {
                setSelectedPlace(place);
              }}
              key={place.id}
              className={styles.itemButton}>
              <PlaceListItem index={idx} item={place} />
            </button>
          );
        })}
      </div>
      <KakaoMap
        lat={selectedPlace ? parseFloat(selectedPlace.y) : 37}
        lon={selectedPlace ? parseFloat(selectedPlace.x) : 128}
        placeName={selectedPlace ? selectedPlace.place_name : '한국'}
      />
    </div>
  );
}
