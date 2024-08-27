'use client';

import Input from '@/components/common/Input';
import Image from 'next/image';
import { InputHTMLAttributes, useState } from 'react';
import styles from './PlaceSearchBar.module.scss';

interface IPlaceSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onClickZoom: (_keyword: string) => void;
}

export default function PlaceSearchBar({
  className,
  onClickZoom,
  ...props
}: IPlaceSearchBarProps) {
  const [value, setValue] = useState('내 주변 보드카페');

  return (
    <div className={`${styles.searchBar} ${className}`}>
      <Input
        className={styles.input}
        placeholder="장소를 검색해주세요!"
        onChange={e => setValue(e.target.value)}
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
