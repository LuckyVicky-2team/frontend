import React, { useState } from 'react';
import styles from './FilterContainer.module.scss';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useClientSearchParams } from '@/hooks/useClientSearchParams';
import { genre } from '@/data/dummyData';
import { city, areas } from '@/data/locationData';
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

  const [searchResult, setSearchResult] = useState<string>('');
  const [showingStartDate, setShowingStartDate] = useState<Date | null>(
    new Date(searchParams.get('startDate')) < new Date()
      ? null
      : getDateFromUrl('startDate')
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

    // else {
    //   searchParams.remove('REPLACE', 'searchWord');
    //   searchParams.remove('REPLACE', 'searchType');
    // }
  };

  const setParamsToUrl = (name: string, value: any) => {
    if (!value || value === null || value === '') {
      searchParams.remove('REPLACE', name);
    } else {
      searchParams.append('REPLACE', { [name]: value });
    }
  };

  const errorMessage = errors.search_word?.message;
  const selectedCity = searchParams.get('city');

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
        <SelectBox
          id="genre"
          optionTitle="선택"
          clickOptionHandler={e => setParamsToUrl('tag', e.target.value)}
          optionSet={genre}
        />
        <SelectBox
          id="city"
          optionTitle="시/도"
          optionSet={city}
          clickOptionHandler={e => setParamsToUrl('city', e.target.value)}
        />
        <SelectBox
          id="area"
          optionTitle="구/군"
          optionSet={selectedCity ? areas[selectedCity] : []}
          clickOptionHandler={e => setParamsToUrl('county', e.target.value)}
          isDisabled={!selectedCity}
          // value={selectCounty}
        />

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

      <div className={styles.sortType}>
        <Image
          width={24}
          height={24}
          alt="upAndDownIcon"
          src={'/assets/icons/upDownArrow.svg'}
        />

        <SelectBox
          id="filter"
          optionSet={[
            { name: '마감임박 순', value: 'MEETING_DATE' },
            { name: '참여인원 순', value: 'PARTICIPANT_COUNT' },
          ]}
          clickOptionHandler={e => setParamsToUrl('sortBy', e.target.value)}
        />
      </div>
      <div className={styles.info}>
        <p>{errorMessage ?? errors.search_word?.message ?? searchResult}</p>
      </div>
    </section>
  );
}
