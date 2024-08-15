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
        placeholder="장소를 검색해주세요!"
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
