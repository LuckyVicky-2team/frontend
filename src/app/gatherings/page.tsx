'use client';

import React, { useState, ChangeEvent } from 'react';
import Link from 'next/link';
import styles from './Gatherings.module.scss';
import { genre, gatheringsList } from '@/data/dummyData';
import { city, areas } from '@/data/locationData';
import SelectBox from '@/components/common/SelectBox';
import Card from './_components/Card';
import DatePicker from '@/components/common/DatePicker';

export default function GatheringsPage() {
  const [selectCity, setSelectCity] = useState<string | undefined>();
  const [selectArea, setSelectArea] = useState<string | undefined>();
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  // TODO @haewon
  // verify logged in user
  // 로그인한 유저 -> 유저정보 가져옴 , 로그인x, 비회원 -> localStorage 정보가져옴

  const changeCityLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCity(e.target.value);
    setSelectArea('');
  };
  const changeAreaLocation = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectArea(e.target.value);
  };

  return (
    <>
      <div>
        <main>
          <section className={styles.searchTabHeader}>
            <div className={styles.filter}>
              <div>
                <SelectBox
                  id="genre"
                  optionTitle="선택"
                  clickOptionHandler={() => {}}
                  optionSet={genre}
                />
                <SelectBox
                  id="city"
                  optionTitle="시/도 선택"
                  optionSet={city}
                  clickOptionHandler={changeCityLocation}
                />
                <SelectBox
                  id="area"
                  optionTitle="구/군 선택"
                  optionSet={selectCity ? areas[selectCity] : []}
                  clickOptionHandler={changeAreaLocation}
                  isDisabled={!selectCity}
                  value={selectArea}
                />
              </div>

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
                  placeholder="종료 날짜"
                  className={`${styles.datePicker}`}
                />
              </div>
            </div>

            <Link href={'/gatherings/new'}>모임 생성하기</Link>
          </section>
          <div className={styles.sortType}>
            <button>마감임박 순</button>
            <button>참여인원 순</button>
          </div>
          <section className={styles.cardContainer}>
            {/* 찜 버튼 - 사용자 식별 필요*/}
            {gatheringsList.map(el => {
              return <Card key={el.id} {...el} />;
            })}
          </section>
        </main>
      </div>
    </>
  );
}
