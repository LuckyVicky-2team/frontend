'use client';

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { IPlaceInfoResponse } from '@/types/kakao';
import PlaceSearchBar from './PlaceSearchBar';
import PlaceListItem from './PlaceListItem';
import getCurrentCoordinate from '@/utils/getCurrentCoordinate';
import calculateDistance from '@/utils/calculateDistance';
import styles from './KakaoList.module.scss';
import kakaoSearch from '@/utils/kakaoSearch';

interface IKakaoListProps {
  className?: string;
  setItem: Dispatch<SetStateAction<IPlaceInfoResponse | undefined>>;
  setStep: Dispatch<SetStateAction<string>>;
}

export default function KakaoList({
  className,
  setItem,
  setStep,
}: IKakaoListProps) {
  const [places, setPlaces] = useState<IPlaceInfoResponse[]>([]);
  const [myPosition, setMyPosition] = useState<{ x: number; y: number }>();

  const setPlaceList = async (
    keyword: string,
    size?: number,
    coordinate?: { lat: number; lon: number }
  ) => {
    try {
      const newList = await kakaoSearch(keyword, size, coordinate);
      setPlaces(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchPlaces = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;

      if (!targetValue) {
        setPlaces([]);
        return;
      }

      const keyword = `${targetValue}`;

      setPlaceList(keyword);
    }
  };

  useEffect(() => {
    const getPosition = async () => {
      const myPosition = await getCurrentCoordinate();
      setMyPosition(myPosition);
    };

    getPosition();
  }, []);

  useEffect(() => {
    if (!myPosition) return;

    const keyword = '보드카페';

    setPlaceList(keyword, 5, {
      lat: myPosition.y,
      lon: myPosition.x,
    });
  }, [myPosition]);

  return (
    <div className={`${styles.list} ${className}`}>
      <PlaceSearchBar
        onKeyUp={handleSearchPlaces}
        defaultValue="내 주변 보드카페"
      />
      <div className={styles.items}>
        {places?.map((place, idx) => {
          const distance =
            myPosition &&
            calculateDistance(
              myPosition.x,
              myPosition.y,
              parseFloat(place.x),
              parseFloat(place.y)
            );
          place.distance = distance ? String(distance.toFixed(2)) : '0';
          place.index = idx;
          return (
            <button
              onClick={() => {
                setItem(place);
                setStep('map');
              }}
              key={place.id}
              className={styles.itemButton}>
              <PlaceListItem index={idx} item={place} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
