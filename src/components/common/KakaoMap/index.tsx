'use client';

import { useEffect, useRef } from 'react';
import styles from './KakaoMap.module.scss';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

interface IKakaoMapProps {
  className?: string;
}

export default function KakaoMap({ className }: IKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        // 지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      // eslint-disable-next-line no-unused-vars
      const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴

      const zoomControl = new window.kakao.maps.ZoomControl(); // 지도 줌 컨트롤 바 선언
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT); // 지도 줌 컨트롤 바 오른쪽에 생성
    });
  }, []);

  return <div className={`${styles.map} ${className}`} ref={mapRef}></div>;
}
