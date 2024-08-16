'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './GatheringsPageClient.module.scss';
import { gatheringAPI } from '@/api/apis/gatheringApis';
import { QueryKey } from '@/utils/QueryKey';
import { genre } from '@/data/dummyData';
import { city, areas } from '@/data/locationData';
import Card from './_components/Card';
import DatePicker from '@/components/common/DatePicker';
import IconButton from '@/components/common/IconButton';
import SelectBox from '@/components/common/SelectBox';
import Skeleton from './_components/Skeleton';

export default function GatheringsPageClient() {
  const [selectCity, setSelectCity] = useState<string | undefined>();
  const [selectCounty, setSelectCounty] = useState<string | undefined>();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectedTag, setSelectTag] = useState<string | undefined>();
  const [infoWord, setInfoWord] = useState<string>('');
  const [sortBy, setSortBy] = useState<'MEETING_DATE' | 'PARTICIPANT_COUNT'>(
    'MEETING_DATE'
  );
  const [tempSearchBar, setTempSearchBar] = useState<{
    type: string | undefined;
    word: string;
  }>();
  const [selectedSearchBar, setSelectSearchBar] = useState<{
    searchType: 'TITLE' | 'CONTENT' | 'ALL' | '' | undefined;
    searchWord: string | undefined;
  }>();
  const { ref, inView } = useInView();

  // TODO @haewon
  // verify logged in user
  // 로그인한 유저 -> 유저정보 가져옴 , 로그인x, 비회원 -> localStorage 정보가져옴
  // const searchParams = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    // hasNextPage,
    // isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: QueryKey.GATHERING.LIST({
      sortBy: sortBy,
      count: 10,
      startDate: selectedEndDate
        ? selectedStartDate?.toISOString().split('Z')[0]
        : undefined,
      endDate: selectedEndDate?.toISOString().split('Z')[0],
      page: 0,
      county: selectCounty,
      city: selectCity,
      tag: selectedTag,
      searchType: selectedSearchBar?.searchType,
      searchWord: selectedSearchBar?.searchWord,
    }),
    queryFn: ({ pageParam = 0 }) =>
      gatheringAPI.gatheringList({
        sortBy: sortBy,
        count: 10,
        page: pageParam,
        startDate: selectedEndDate
          ? selectedStartDate?.toISOString().split('Z')[0]
          : undefined,
        endDate: selectedEndDate?.toISOString().split('Z')[0],
        county: selectCounty,
        city: selectCity,
        tag: selectedTag,
        searchType: selectedSearchBar?.searchType,
        searchWord: selectedSearchBar?.searchWord,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage.length < 10) return undefined;
      return pages.length;
    },
  });

  const gatherings = data?.pages.flatMap(page => page) || [];

  const changeCityLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCity(e.target.value);
    setSelectCounty('');
  };
  const changeAreaLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCounty(e.target.value);
  };
  const searchByWord = () => {
    let searchType: 'TITLE' | 'CONTENT' | 'ALL' | '' | undefined;

    if (tempSearchBar?.type === '제목') {
      searchType = 'TITLE';
    } else if (tempSearchBar?.type === '내용') {
      searchType = 'CONTENT';
    } else if (tempSearchBar?.type === '제목+내용') {
      searchType = 'ALL';
    } else {
      searchType = '';
    }

    setSelectSearchBar({
      searchType,
      searchWord: tempSearchBar?.word,
    });
    setInfoWord(`'${tempSearchBar?.word}' 검색결과 입니다.`);
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div>
        <main>
          <Link href={'/gatherings/new'}>
            <button className={styles.addGatheringBtn}>
              <Image
                src={'/assets/icons/plusCircle.svg'}
                alt={'addIcon'}
                width={24}
                height={24}
              />
            </button>
          </Link>
          <section className={styles.searchTabHeader}>
            <div className={styles.searchBar}>
              <div className={styles.searchDropdown}>
                <SelectBox
                  clickOptionHandler={e =>
                    setTempSearchBar(prev => ({
                      word: prev?.word ?? '',
                      type: e.target.value,
                    }))
                  }
                  id="searchDropdown"
                  optionSet={['제목', '내용', '제목+내용']}
                />
                <div className={styles.arrowDown}>
                  <IconButton
                    size={'xsmall'}
                    imgUrl={'/assets/icons/downArrow.svg'}
                  />
                </div>
              </div>
              <input
                placeholder={'전략 게임'}
                type="text"
                onChange={e => {
                  setTempSearchBar(prev => ({
                    type: prev?.type ?? '',
                    word: e.target.value,
                  }));
                }}
                id="searchBar"
              />
              <button onClick={searchByWord}>
                <Image
                  src={'/assets/icons/search.svg'}
                  alt="finder"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            <div className={styles.filter}>
              <SelectBox
                id="genre"
                optionTitle="선택"
                clickOptionHandler={e => {
                  setSelectTag(e.target.value);
                }}
                optionSet={genre}
              />
              <SelectBox
                id="city"
                optionTitle="시/도"
                optionSet={city}
                clickOptionHandler={changeCityLocation}
              />
              <SelectBox
                id="area"
                optionTitle="구/군"
                optionSet={selectCity ? areas[selectCity] : []}
                clickOptionHandler={changeAreaLocation}
                isDisabled={!selectCity}
                value={selectCounty}
              />

              <div className={styles.aaa}>
                <DatePicker
                  selectedDate={selectedStartDate}
                  setSelectedDate={setSelectedStartDate}
                  placeholder="시작 날짜"
                  className={`${styles.datePicker}`}
                />
              </div>
              <div className={styles.aaa}>
                <DatePicker
                  selectedDate={selectedEndDate}
                  setSelectedDate={setSelectedEndDate}
                  isDisabled={!selectedStartDate}
                  minDate={selectedStartDate ? selectedStartDate : null}
                  placeholder="종료 날짜"
                  className={`${styles.datePicker} ${!selectedStartDate && styles.disabled}`}
                />
              </div>
            </div>
            <div className={styles.info}>
              <p>{infoWord}</p>
            </div>

            <div className={styles.sortType}>
              <IconButton
                imgUrl={'/assets/icons/upDownArrow.svg'}
                size={'small'}
              />
              <SelectBox
                id="filter"
                optionSet={['마감임박', '참여인원']}
                clickOptionHandler={e => {
                  setSortBy(
                    e.target.value === 'MEETING_DATE'
                      ? 'MEETING_DATE'
                      : 'PARTICIPANT_COUNT'
                  );
                }}
              />
            </div>
          </section>
          {status === 'pending' ? (
            <div className={styles.cardContainer}>
              <Skeleton />
            </div>
          ) : status === 'error' ? (
            <p>Error:{error.message}</p>
          ) : gatherings.length ? (
            <section className={styles.cardContainer}>
              {/* 찜 버튼 - 사용자 식별 필요*/}
              {gatherings.map(el => {
                return <Card key={el.id} {...el} />;
              })}
              {isFetchingNextPage ? <Skeleton /> : <div ref={ref}></div>}
            </section>
          ) : (
            <div className={`${styles.cardContainer} ${styles.empty}`}>
              <p className={styles.emptyContent}>
                앗 조건에 해당하는 모임이 없어요!
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
