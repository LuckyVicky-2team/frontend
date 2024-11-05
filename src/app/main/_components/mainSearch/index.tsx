'use client';
import React, { useState } from 'react';
import styles from '../../main.module.scss';
import Image from 'next/image';

export default function MainSearch() {
  const [searchQuery, setSearchQuery] = useState<string>(''); // 검색어 상태 추가

  const handleSearch = () => {
    if (searchQuery) {
      const encodedQuery = encodeURIComponent(searchQuery); // 검색어 인코딩
      window.location.href = `/gatherings?searchWord=${encodedQuery}&searchType=TITLE`; // URL로 리디렉션
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // 엔터 키를 누르면 검색 실행
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder={'나에게 딱! 맞는 모임을 추천해주세요'}
        value={searchQuery} // 검색어 상태 값
        onChange={e => setSearchQuery(e.target.value)} // 검색어 입력 처리
        onKeyDown={handleKeyDown} // 키 입력 처리
      />
      <button onClick={handleSearch}>
        <Image width={24} height={24} src={'/assets/icons/search.svg'} alt="" />
      </button>{' '}
      {/* 검색 버튼 */}
    </div>
  );
}
