'use client';
import React from 'react';
import styles from './DeadLineGather.module.scss';

interface DateData {
  id: number;
  title: string;
  title2: string;
  start_date: string | number;
  end_date: string | number;
}
const DeadLineGather: React.FC = () => {
  const data: DateData[] = [
    {
      id: 1,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-08-02',
    },
    {
      id: 2,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-07-24',
    },
    {
      id: 3,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-08-02',
    },
    {
      id: 3,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-08-02',
    },
    {
      id: 3,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-08-02',
    },
    {
      id: 3,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-08-02',
    },
    {
      id: 4,
      title: '성수동 보드게임 모임합니다',
      title2: '2명~5명 오세요',
      start_date: '2024-07-10',
      end_date: '2024-07-24',
    },
  ];

  const today = new Date();
  const filterDeadLineGathering = data.filter(e => {
    const endDate = new Date(e.end_date);
    return (
      endDate >= today &&
      endDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000) // 3일 안쪽
    );
  });
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>마감임박모임</h1>
        <ul className={styles.deadUl}>
          {filterDeadLineGathering.map((e, i) => {
            return (
              <li key={i} className={styles.deadLi}>
                <span className={styles.deadLiImg}>이미지</span>
                <span className={styles.info}>
                  <span>{e.title}</span>
                  <span>{e.title2}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DeadLineGather;
