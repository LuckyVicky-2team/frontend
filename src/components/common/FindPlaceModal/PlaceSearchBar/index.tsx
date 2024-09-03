'use client';

import Input from '@/components/common/Input';
import Image from 'next/image';
import { InputHTMLAttributes, useEffect, useState } from 'react';
import styles from './PlaceSearchBar.module.scss';

interface IPlaceSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onClickZoom: (_keyword: string) => void;
  myPosition: boolean;
  isMobile: boolean;
}

export default function PlaceSearchBar({
  className,
  onClickZoom,
  myPosition,
  isMobile,
  ...props
}: IPlaceSearchBarProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(
      myPosition ? (isMobile ? '보드 카페' : '내 주변 보드 게임 카페') : ''
    );
  }, [myPosition, isMobile]);

  return (
    <div className={`${styles.searchBar} ${className}`}>
      <Input
        className={styles.input}
        placeholder={isMobile ? '장소 검색' : '장소를 검색해주세요!'}
        onChange={e => setValue(e.target.value)}
        value={value}
        {...props}
      />
      <button
        className={styles.zoom}
        type="button"
        onClick={() => onClickZoom(value)}>
        <Image
          className={styles.zoom}
          src="/assets/icons/search-zoom.svg"
          alt="search"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
