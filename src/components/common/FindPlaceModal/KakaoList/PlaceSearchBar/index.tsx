import Input from '@/components/common/Input';
import Image from 'next/image';
import styles from './PlaceSearchBar.module.scss';
import { InputHTMLAttributes } from 'react';

interface IPlaceSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function PlaceSearchBar({
  className,
  ...props
}: IPlaceSearchBarProps) {
  return (
    <div className={`${styles.searchBar} ${className}`}>
      <Input
        className={styles.input}
        placeholder="위치를 검색하시면 주변 보드게임카페를 추천해드려요!"
        {...props}
      />
      <Image
        className={styles.zoom}
        src="/assets/icons/search-zoom.svg"
        alt="search"
        width={24}
        height={24}
      />
    </div>
  );
}
