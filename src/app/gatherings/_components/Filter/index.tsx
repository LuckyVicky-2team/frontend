'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useSearchQuery } from '../../utils/useSearchQuery';
import { dateToISOString } from '@/utils/common';
import { genre } from '@/data/dummyData';
import { cities, areas, cityMapping } from '@/data/locationData';
import styles from '../Filter/Filter.module.scss';
import SearchBar from '../SearchBar';
import SelectBox from '@/components/common/SelectBox';
import DatePicker from '@/components/common/DatePicker';

interface IFilterProps {
  tag?: string;
  city?: string;
  county?: string;
  startDate?: Date | '';
  endDate?: Date | '';
  searchType?: string;
  searchWord?: string;
  sortBy?: string;
  page?: number;
  state?: string | null;
}

export default function Filter({
  filterItems: {
    startDate = '',
    endDate = '',
    city = '',
    tag = '',
    county = '',
    state = null,
    sortBy = '',
  },
  setParams,
  clearParams,
}: {
  filterItems: IFilterProps;
  setParams: any;
  clearParams: () => void;
}) {
  const { searchKeyword, searchType, setSearch } = useSearchQuery();
  const formattedEndDate = new Date(endDate);
  const arrangedEndDate = new Date(
    formattedEndDate.setDate(formattedEndDate.getDate() - 1)
  );
  const transCityText = (city: string) => {
    return cityMapping[city] || city;
  };
  const [searchResult, setSearchResult] = useState<string>('');
  const [showingStartDate, setShowingStartDate] = useState<Date | null>(
    startDate ? new Date(startDate) : null
  );
  const [showingEndDate, setShowingEndDate] = useState<Date | null>(
    endDate ? arrangedEndDate : null
  );

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search_word: searchKeyword,
      search_type: 'TITLE',
    },
  });
  const errorMessage = errors.search_word?.message;

  const onSearch = (data: { [key: string]: any }) => {
    setSearch({ keyword: data['search_word'], type: data['search_type'] });
    setSearchResult(`${data['search_word']} 검색결과 입니다.`);
  };

  const handleResetFilters = () => {
    clearParams();
    setShowingStartDate(null);
    setShowingEndDate(null);
    setSearchResult('');
    reset();
  };

  return (
    <section className={styles.searchTabHeader}>
      <SearchBar
        placeholder={'전략 게임'}
        searchType={searchType}
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
            clickOptionHandler={e => {
              const gameTag =
                e.target.value === ''
                  ? e.target.value
                  : `${e.target.value}게임`;
              setParams({ tag: gameTag });
            }}
            optionSet={genre}
            value={tag}
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
            optionSet={cities}
            clickOptionHandler={e =>
              setParams({ city: transCityText(e.target.value) })
            }
            value={city}
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
            optionSet={city ? areas[city] : []}
            clickOptionHandler={e => setParams({ county: e.target.value })}
            isDisabled={!city}
            value={county}
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
                  // 초기 선택 시, startDate는 params로 설정하지않고 UI만 변경
                  setShowingStartDate(date);
                } else if (showingEndDate && date > showingEndDate) {
                  // 재선택시, startDate 변경: startDate가 endDate보다 이후 날짜로 변경할 경우
                  const nextDay = new Date(date);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setShowingEndDate(date); // endDate를 startDate로 변경
                  const endDateISO = dateToISOString(nextDay);
                  setParams({ startDate: startDateISO!, endDate: endDateISO! });
                } else {
                  // 재선택시, startDate 변경: startDate가 endDate 보다 이전 날짜로 변경할 경우
                  setParams({ startDate: startDateISO });
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
                setParams({ startDate: startDateISO!, endDate: endDateISO! });
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
        <div className={styles.filterCompleteGatheringBtn}>
          <label htmlFor={'filterCompleteGatherings'}>
            <div className={styles.check}>
              {state === null ? (
                <Image
                  width={24}
                  height={24}
                  src={'/assets/icons/checkBlue.svg'}
                  alt={'checkbox'}
                />
              ) : (
                <div className={styles.empty} />
              )}
            </div>
            <input
              type="checkbox"
              id={'filterCompleteGatherings'}
              checked={state === null}
              onChange={e => {
                setParams({ state: e.target.checked ? null : 'COMPLETE' });
              }}
            />
            <span>모집중만 보기</span>
          </label>
        </div>
        <div className={styles.resetBtn} onClick={handleResetFilters}>
          <span>초기화</span>
          <Image
            width={24}
            height={24}
            alt="upAndDownIcon"
            src={'/assets/icons/reset.svg'}
          />
        </div>

        <div className={styles.sortType}>
          <SelectBox
            id="filter"
            optionSet={[
              { name: '마감임박 순', value: 'MEETING_DATE' },
              { name: '참여인원 순', value: 'PARTICIPANT_COUNT' },
            ]}
            value={sortBy === 'MEETING_DATE' ? '' : sortBy}
            clickOptionHandler={e => setParams({ sortBy: e.target.value })}
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
      </div>
      {searchKeyword !== null && (
        <div className={styles.info}>
          <p>{errorMessage ?? errors.search_word?.message ?? searchResult}</p>
        </div>
      )}
    </section>
  );
}
