'use client';
import React, { useState, useEffect } from 'react';
import styles from './FilterContainer.module.scss';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useClientSearchParams } from '@/hooks/useClientSearchParams';
import { genre } from '@/data/dummyData';
import { city, areas, cityMapping } from '@/data/locationData';
import { dateToISOString } from '@/utils/common';
import DatePicker from '@/components/common/DatePicker';
import SelectBox from '@/components/common/SelectBox';
import SearchBar from '../SearchBar';

export default function FilterContainer() {
  const searchParams = useClientSearchParams();
  const getDateFromUrl = (query: string) => {
    return new Date(searchParams.get(query));
  };
  const endDate = getDateFromUrl('endDate');
  const arrangedEndDate = new Date(endDate.setDate(endDate.getDate() - 1));

  const transCityText = (city: string) => {
    return cityMapping[city] || city;
  };
  const [searchResult, setSearchResult] = useState<string>('');
  const [showingStartDate, setShowingStartDate] = useState<Date | null>(
    new Date(searchParams.get('startDate')) < new Date()
      ? null
      : getDateFromUrl('startDate')
  );
  const [selectedGenre, setSelectedGenre] = useState<string>(
    searchParams.get('tag') || ''
  );
  const [selectedCity, setSelectedCity] = useState<string>(
    searchParams.get('city') || ''
  );
  const [selectedCounty, setSelectedCounty] = useState<string>(
    searchParams.get('county') || ''
  );
  const [showingEndDate, setShowingEndDate] = useState<Date | null>(
    getDateFromUrl('endDate') < new Date() ? null : arrangedEndDate
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search_word: searchParams.get('searchWord'),
      search_type: searchParams.get('searchType') || 'TITLE',
    },
  });

  const onSearch = (data: { [key: string]: any }) => {
    if (data['search_word'].trim() !== '') {
      searchParams.append('REPLACE', {
        searchWord: data['search_word'],
        searchType: data['search_type'],
      });
    }
    setSearchResult(`${data['search_word']} 검색결과 입니다.`);
  };

  const setParamsToUrl = (name: string, value: any) => {
    if (!value || value === null || value === '') {
      searchParams.remove('REPLACE', name);
    } else {
      searchParams.append('REPLACE', { [name]: value });
    }
  };
  const isSearchWord = searchParams.get('searchWord');
  const errorMessage = errors.search_word?.message;
  // const selectedCity = searchParams.get('city');

  const handleResetFilters = () => {
    // 모든 검색 매개변수를 제거하여 초기화
    searchParams.clear('REPLACE');

    // 훅폼의 기본값 설정
    setValue('search_word', '');
    setValue('search_type', 'TITLE');

    // 상태 초기화
    setSearchResult('');
    setShowingStartDate(null);
    setShowingEndDate(null);
    setSelectedGenre('');
    setSelectedCity('');
    setSelectedCounty('');
  };

  useEffect(() => {
    setSelectedGenre(searchParams.get('tag') || '');
    setSelectedCity(searchParams.get('city') || '');
    setSelectedCounty(searchParams.get('county') || '');
  }, [JSON.stringify(searchParams.get())]);

  return (
    <section className={styles.searchTabHeader}>
      <SearchBar
        register={register}
        setValue={setValue}
        selectOptionSet={[
          {
            name: '제목',
            value: 'TITLE',
          },
          {
            name: '내용',
            value: 'CONTENT',
          },
          {
            name: '제목 + 내용',
            value: 'ALL',
          },
        ]}
        searchHandler={e => {
          handleSubmit(onSearch)(e);
        }}
      />
      <div className={styles.filter}>
        <div className={styles.genreSelectBox}>
          <SelectBox
            id="genre"
            optionTitle="장르"
            clickOptionHandler={e =>
              setParamsToUrl('tag', `${e.target.value}게임`)
            }
            optionSet={genre}
            value={selectedGenre}
            rightLabel={
              <Image
                sizes={'100%'}
                fill
                alt="upAndDownIcon"
                src={'/assets/icons/filledArrowDown.svg'}
              />
            }
          />
        </div>
        <div className={styles.locationSelectBox}>
          <SelectBox
            id="city"
            optionTitle="시/도"
            optionSet={city}
            clickOptionHandler={e =>
              setParamsToUrl('city', transCityText(e.target.value))
            }
            value={selectedCity}
            rightLabel={
              <Image
                sizes={'100%'}
                fill
                alt="upAndDownIcon"
                src={'/assets/icons/filledArrowDown.svg'}
              />
            }
          />
        </div>
        <div className={styles.locationSelectBox}>
          <SelectBox
            id="area"
            optionTitle="구/군"
            optionSet={selectedCity ? areas[selectedCity] : []}
            clickOptionHandler={e => setParamsToUrl('county', e.target.value)}
            isDisabled={!selectedCity}
            value={selectedCounty}
            rightLabel={
              <Image
                sizes={'100%'}
                fill
                alt="upAndDownIcon"
                src={'/assets/icons/filledArrowDown.svg'}
              />
            }
          />
        </div>
        <div className={styles.dates}>
          <div className={styles.aaa}>
            <DatePicker
              selectedDate={showingStartDate}
              minDate={new Date()}
              setSelectedDate={(date: Date | null) => {
                if (!date) return;
                setShowingStartDate(date);
                const startDateISO = dateToISOString(date);

                if (!showingEndDate && !showingStartDate) {
                  //1. 초기렌더링. endDate 없고 startDate 설정
                  setShowingStartDate(date);
                } else if (showingEndDate && date > showingEndDate) {
                  // 2.. endDate가 있고, 새로 설정하려는 startDate가 endDate보다 이후일 경우
                  const copyDate = new Date(date);
                  const dateMidnight = new Date(
                    copyDate.setDate(copyDate.getDate() + 1)
                  );
                  setShowingEndDate(date); // endDate를 startDate로 변경
                  const endDateISO = dateToISOString(dateMidnight);
                  searchParams.append('REPLACE', {
                    startDate: startDateISO!,
                    endDate: endDateISO!,
                  });
                } else {
                  //새로 설정하려는 startDate이 endDate보다 이전이고, startDate 만 변경할경우
                  setParamsToUrl('startDate', startDateISO);
                }
              }}
              placeholder="시작 날짜"
              className={`${styles.datePicker}`}
            />
          </div>
          <div className={styles.aaa}>
            <DatePicker
              readOnly
              selectedDate={showingEndDate}
              setSelectedDate={(date: Date | null) => {
                if (!date) return;
                setShowingEndDate(date);
                const copyDate = new Date(date);
                const dateMidnight = new Date(
                  copyDate.setDate(copyDate.getDate() + 1)
                );
                const endDateISO = dateToISOString(dateMidnight);

                const startDateISO = dateToISOString(showingStartDate);
                searchParams.append('REPLACE', {
                  startDate: startDateISO!,
                  endDate: endDateISO!,
                });
              }}
              isDisabled={!showingStartDate}
              minDate={showingStartDate ? showingStartDate : null}
              placeholder="종료 날짜"
              className={`${styles.datePicker}`}
            />
          </div>
        </div>
      </div>

      <div className={styles.sortContainer}>
        <div className={styles.resetBtn} onClick={handleResetFilters}>
          <h3>초기화</h3>
          <Image
            width={24}
            height={24}
            alt="upAndDownIcon"
            src={'/assets/icons/reset.svg'}
          />
        </div>
        {/* <div className={styles.sortType}> */}
        <div className={styles.sortType}>
          <SelectBox
            id="filter"
            optionSet={[
              { name: '마감임박 순', value: 'MEETING_DATE' },
              { name: '참여인원 순', value: 'PARTICIPANT_COUNT' },
            ]}
            clickOptionHandler={e => setParamsToUrl('sortBy', e.target.value)}
            leftLabel={
              <Image
                fill
                sizes={'100%'}
                alt="upAndDownIcon"
                src={'/assets/icons/upDownArrow.svg'}
              />
            }
          />
        </div>
        {/* </div> */}
      </div>
      {isSearchWord !== null && (
        <div className={styles.info}>
          <p>{errorMessage ?? errors.search_word?.message ?? searchResult}</p>
        </div>
      )}
    </section>
  );
}
