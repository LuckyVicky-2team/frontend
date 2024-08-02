'use client';

import { useEffect, useRef } from 'react';
import getCurrentCoordinate from '@/apis/geolocationApi';
import styles from './KakaoMap.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

interface IKakaoMapProps {
  className?: string;
}

export default function KakaoMap({ className }: IKakaoMapProps) {
  // const [places, setPlaces] = useState<any[]>([]);
  // const [pages, setPages] = useState<any>();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(async () => {
      const locPosition = await getCurrentCoordinate();

      const mapOptions = {
        center: locPosition,
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const ps = new window.kakao.maps.services.Places();

      // const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      function searchPlaces() {
        const keyword = '보드카페';

        const searchOptions = {
          location: locPosition,
          radius: 10000,
        };

        ps.keywordSearch(keyword, placesSearchCB, searchOptions);
      }

      function placesSearchCB(data: any, status: any, pagination: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          console.log(data);
          console.log(pagination);
          // setPlaces(data);
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          console.log('지도 생성 중 오류가 발생했습니다.');
          return;
        }
      }

      searchPlaces();
    });
  }, []);

  return (
    <>
      <div className={`${styles.map} ${className}`} ref={mapRef}></div>
      <div className={styles.menu_wrap}>
        <ul className={styles.placesList}></ul>
        <div className={styles.pagination}></div>
      </div>
    </>
  );
}
