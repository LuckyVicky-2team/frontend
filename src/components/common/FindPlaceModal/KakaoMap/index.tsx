'use client';

import { useEffect, useRef } from 'react';
import PlaceListItem from '../KakaoList/PlaceListItem';
import styles from './KakaoMap.module.scss';

interface IKakaoMapProps {
  coordinate: { lat: string; lon: string };
  placeName: string;
  address: string;
  index?: number;
  distance?: string;
  placeURL?: string;
  categoryName?: string;
  className?: string;
  isMobile: boolean;
  mapLatio?: string;
}

/**
 * @param coordinate 장소의 좌표값(필수)
 * @param placeName 장소의 이름(필수)
 * @param address 장소의 주소(필수)
 * @param index 리스트 상의 index 값. 모달에서만 사용.
 * @param distance 장소와 내 위치 사이의 거리. 모달에서만 사용.
 * @param placeURL 장소의 카카오 정보 페이지 URL. 모달에서만 사용.
 * @param categoryName 장소의 분류. 모달에서만 사용.
 * @param mapLatio 지도의 가로, 세로 비율
 * @param className 컴포넌트 임의 스타일 지정
 */
export default function KakaoMap({
  coordinate,
  placeName,
  index,
  address,
  distance,
  placeURL,
  categoryName,
  className,
  isMobile,
  mapLatio = '1/1',
}: IKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao?.maps.load(() => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lon),
        level: 3,
        scrollwheel: false,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const setMarker = (idx: number | undefined) => {
        let markerImage;

        if (idx !== undefined) {
          const imageSrc =
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
          const imageSize = new window.kakao.maps.Size(36, 37);
          const imgOptions = {
            spriteSize: new window.kakao.maps.Size(36, 691),
            spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
            offset: new window.kakao.maps.Point(13, 37),
          };
          markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imgOptions
          );
        }

        const marker = new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(
            coordinate.lat,
            coordinate.lon
          ),
          image: markerImage,
        });

        return marker;
      };

      const marker = setMarker(index);

      if (placeName) {
        const infowindow = new window.kakao.maps.InfoWindow({
          zIndex: 1,
          content: `<div class="${styles.infowindow}">${placeName}</div>`,
        });

        const openInfo = () => {
          infowindow.open(map, marker);
        };

        const closeInfo = () => {
          infowindow.close(map, marker);
        };

        window.kakao.maps.event.addListener(marker, 'mouseover', openInfo);
        window.kakao.maps.event.addListener(marker, 'mouseout', closeInfo);

        return () => {
          window.kakao.maps.event.removeListener(marker, 'mouseover', openInfo);
          window.kakao.maps.event.removeListener(marker, 'mouseout', closeInfo);
        };
      }
    });
  }, [coordinate, placeName, index]);

  return (
    <div className={`${styles.container} ${className}`}>
      <div
        className={styles.map}
        ref={mapRef}
        style={{ aspectRatio: mapLatio }}></div>
      <PlaceListItem
        index={index}
        placeName={placeName}
        address={address}
        distance={distance}
        placeURL={placeURL}
        categoryName={categoryName}
        className={styles.item}
        isMobile={isMobile}
      />
    </div>
  );
}
