'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useSearchQuery } from '../gatherings/utils/useSearchQuery';
import styles from './RecommendLayout.module.scss';
import SearchBar from '../gatherings/_components/SearchBar';

interface RecommendLayoutProps {
  children: React.ReactNode;
}

export default function RecommendLayout({ children }: RecommendLayoutProps) {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category as string);
  const { searchKeyword, setSearch } = useSearchQuery();
  const { handleSubmit, register, setValue, resetField } = useForm({
    defaultValues: {
      search_word: searchKeyword,
      search_type: 'ALL',
    },
  });

  const onSearch = (data: { [key: string]: any }) => {
    setSearch({ keyword: data['search_word'], type: '' });
  };
  useEffect(() => {
    if (!searchKeyword) resetField('search_word');
  }, [searchKeyword]);

  return (
    <div className={styles.recoWrap}>
      <SearchBar
        placeholder={'보드게임 이름으로 전체검색 해보세요!'}
        register={register}
        setValue={setValue}
        searchHandler={e => {
          handleSubmit(onSearch)(e);
        }}
      />

      <div className={styles.recoTabWrap}>
        <Link
          href="/recommend/two"
          className={decodedCategory === 'two' ? `${styles.on}` : ''}>
          2인 게임
        </Link>
        <Link
          href="/recommend/three"
          className={decodedCategory === 'three' ? `${styles.on}` : ''}>
          3인 게임
        </Link>
        <Link
          href="/recommend/many"
          className={decodedCategory === 'many' ? `${styles.on}` : ''}>
          다인용 게임
        </Link>
        <Link
          href="/recommend/all"
          className={decodedCategory === 'all' ? `${styles.on}` : ''}>
          전체
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
