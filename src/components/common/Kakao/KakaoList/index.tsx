'use client';

import { useEffect, useState } from 'react';
import getCurrentCoordinate from '@/apis/geolocationApi';
import styles from './KakaoList.module.scss';
import { IPlaceInfo } from '@/types/kakao';
import PlaceSearchBar from './PlaceSearchBar';

interface IKakaoListProps {
  className?: string;
}

export default function KakaoList({ className }: IKakaoListProps) {
  const [places, setPlaces] = useState<IPlaceInfo[]>([]);

  useEffect(() => {
    window.kakao.maps.load(async () => {
      const locPosition = await getCurrentCoordinate();

      const ps = new window.kakao.maps.services.Places();

      function searchPlaces() {
        const keyword = '보드카페';

        const searchOptions = {
          location: locPosition,
          radius: 10000,
        };

        ps.keywordSearch(keyword, placesSearchCB, searchOptions);
      }

      function placesSearchCB(data: any, status: 'OK' | 'ERORR') {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(data);
          setPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          console.log('지도 생성 중 오류가 발생했습니다.');
          return;
        }
      }

      searchPlaces();
    });
  }, []);

  return (
    <div className={`${styles.list} ${className}`}>
      <PlaceSearchBar />
      <div className={styles.items}>
        {places.map(place => {
          return (
            <div key={place.id}>
              <div></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
