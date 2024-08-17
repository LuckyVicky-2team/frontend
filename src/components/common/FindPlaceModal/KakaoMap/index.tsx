'use client';

import { useEffect, useRef } from 'react';
import styles from './KakaoMap.module.scss';

interface IKakaoMapProps {
  coordinate?: { lat: string; lon: string };
  placeName?: string;
  index?: number;
}

export default function KakaoMap({
  coordinate = { lat: '30', lon: '120' },
  placeName,
  index,
}: IKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(coordinate.lat, coordinate.lon),
        level: 3,
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

  return <div className={`${styles.map}`} ref={mapRef}></div>;
}
