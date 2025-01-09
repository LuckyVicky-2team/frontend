import React from 'react';
import Image from 'next/image';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import styles from './SearchBar.module.scss';
import SelectBox from '@/components/common/SelectBox';

interface ISearchBarProps {
  selectOptionSet?:
    | {
        name: string;
        value: string;
      }[]
    | [];

  setValue: UseFormSetValue<{ search_word: string; search_type: string }>;
  register: UseFormRegister<{ search_word: string; search_type: string }>;
  searchHandler: (_args?: any) => void;
  searchType?: string;
  placeholder: string;
}

export default function SearchBar({
  selectOptionSet,
  placeholder,
  setValue,
  register,
  searchHandler,
  searchType,
}: ISearchBarProps) {
  const transSearchType = selectOptionSet?.find(
    e => e.value === searchType
  )?.name;

  return (
    <div className={styles.searchBar}>
      {selectOptionSet && (
        <div className={styles.searchDropdown}>
          <SelectBox
            value={transSearchType}
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
      )}

      <input
        {...register('search_word', {
          required: '검색어가 입력되지 않았습니다.',
        })}
        placeholder={placeholder}
        type="text"
        id="searchBar"
        onKeyDown={e => {
          if (e.key === 'Enter') searchHandler();
        }}
        style={{
          padding: selectOptionSet ? '0 6px 0 20px' : '0 6px 0 6px',
        }}
      />
      <button className={styles.submit} type="submit" onClick={searchHandler}>
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
