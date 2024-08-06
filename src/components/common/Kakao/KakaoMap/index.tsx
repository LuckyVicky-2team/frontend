'use client';

import { useEffect, useRef } from 'react';
import styles from './KakaoMap.module.scss';

interface IKakaoMapProps {
  className?: string;
  lat: number;
  lon: number;
  placeName: string;
}

export default function KakaoMap({
  className,
  lat,
  lon,
  placeName,
}: IKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const mapOptions = {
        center: new window.kakao.maps.LatLng(lat, lon),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(lat, lon),
      });

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
    });
  }, [lat, lon, placeName]);

  return <div className={`${styles.map} ${className}`} ref={mapRef}></div>;
}
