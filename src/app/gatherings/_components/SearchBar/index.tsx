import React from 'react';
import styles from './SearchBar.module.scss';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import SelectBox from '@/components/common/SelectBox';
import Image from 'next/image';

interface ISearchBarProps {
  selectOptionSet:
    | {
        name: string;
        value: string;
      }[]
    | [];

  setValue: UseFormSetValue<{ search_word: string; search_type: string }>;
  register: UseFormRegister<{ search_word: string; search_type: string }>;
  searchHandler: (_args: any) => void;
}

export default function SearchBar({
  selectOptionSet,
  setValue,
  register,
  searchHandler,
}: ISearchBarProps) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchDropdown}>
        <SelectBox
          className={styles.reset}
          clickOptionHandler={e => {
            setValue('search_type', e.target.value);
          }}
          id="searchDropdown"
          optionSet={selectOptionSet}
          rightLabel={
            <div
              style={{
                position: 'relative',
                width: '12px',
                height: '6px',
                margin: 'auto 0',
              }}>
              <Image
                fill
                sizes={'100%'}
                alt="downArrowIcon"
                src={'/assets/icons/downArrow.svg'}
              />
            </div>
          }
        />
        <div className={styles.arrowDown}></div>
      </div>
      <input
        {...register('search_word', {
          required: '검색어가 입력되지 않았습니다.',
        })}
        placeholder={'전략 게임'}
        type="text"
        id="searchBar"
      />
      <button type="submit" onClick={searchHandler}>
        <Image
          src={'/assets/icons/searchLight.svg'}
          alt="finder"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
