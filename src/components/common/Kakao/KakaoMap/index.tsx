'use client';

import { useEffect, useRef } from 'react';
import { IPlaceInfo, StatusType } from '@/types/kakao';
import styles from './KakaoMap.module.scss';

interface IKakaoMapProps {
  className?: string;
  keyword: string;
}

export default function KakaoMap({ className, keyword }: IKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const ps = new window.kakao.maps.services.Places();

      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

      const displayMarker = (place: IPlaceInfo) => {
        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(place.y, place.x),
        });

        infowindow.setContent(
          `<div class="${styles.infowindow}">${place.place_name}</div>`
        );

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close(map, marker);
        });
      };

      ps.keywordSearch(
        keyword,
        (data: IPlaceInfo[], status: StatusType) => {
          console.log(data);
          if (status === window.kakao.maps.services.Status.OK) {
            displayMarker(data[0]);
            map.setCenter(new window.kakao.maps.LatLng(data[0].y, data[0].x));
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            throw new Error('지도를 불러올 수 없습니다.');
          }
        },
        { size: 1 }
      );
    });
  }, [keyword]);

  return <div className={`${styles.map} ${className}`} ref={mapRef}></div>;
}
