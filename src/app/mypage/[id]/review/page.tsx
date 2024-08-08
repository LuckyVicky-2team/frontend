'use client';

import { MouseEvent, useState } from 'react';
import styles from './Review.module.scss';
import BackButton from '@/components/common/BackButton';
import GatheringItem from './_components/GatheringItem';
import ReviewItem from './_components/ReviewItem';

export default function ReviewPage() {
  const [currentTab, setCurrentTab] = useState('writeReview');
  const changeUnderLine = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
    setCurrentTab(e.currentTarget.value);
  };

  const gatheringList: any[] = [
    {
      id: 1,
      title: '안녕하세요~ 2명 구합니다',
      imageUrl: '',
      location: '서울시 동작구',
      gatheringDate: '2023.08.07 19:00',
      participantCount: 0,
      capacity: 2,
    },
    {
      id: 2,
      title: '파티게임류 좋아하시는분만',
      imageUrl: '',
      location: '서울시 구로구',
      gatheringDate: '2024.04.05 13:00',
      participantCount: 3,
      capacity: 3,
    },
    {
      id: 3,
      title: '보드게임러 모여라',
      imageUrl: '',
      location: '인천시 연수구',
      gatheringDate: '2024.07.10 20:00',
      participantCount: 7,
      capacity: 7,
    },
  ];
  // const writtenReviewList: any[] = [
  //   {
  //     id: 1,
  //     title: '좋은 모임이었어요',
  //     content: '재미있었습니다.',
  //     rating: 4,
  //     date: '2023.08.10',
  //   },
  // ];
  const writtenReviewList: any[] = [];
  const receivedReviewList: any[] = [];

  const list =
    currentTab === 'writeReview'
      ? gatheringList
      : currentTab === 'writtenReviews'
        ? writtenReviewList
        : receivedReviewList;
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>보고</h1>
        <div className={styles.commonLayout}>
          <BackButton />
          <h2>리뷰 내역</h2>
        </div>
      </header>

      <section>
        <nav className={styles.tabHeader}>
          <button
            value={'writeReview'}
            onClick={changeUnderLine}
            className={`${currentTab === 'writeReview' && styles.active}`}>
            리뷰 작성하기
          </button>
          <button
            value={'writtenReviews'}
            onClick={changeUnderLine}
            className={`${currentTab === 'writtenReviews' && styles.active}`}>
            내가 쓴 리뷰
          </button>
          <button
            value={'receivedReviews'}
            onClick={changeUnderLine}
            className={`${currentTab === 'receivedReviews' && styles.active}`}>
            나에게 달린 리뷰
          </button>
        </nav>
        <main>
          <div>
            {list.length > 0 ? (
              list.map(item => {
                return (
                  <>
                    {currentTab === 'writeReview' && (
                      <GatheringItem key={item.id} item={item} />
                    )}
                    {currentTab === 'writtenReviews' && (
                      <ReviewItem key={item.id} item={item} />
                    )}
                    {currentTab === 'receivedReviews' && (
                      <ReviewItem key={item.id} item={item} />
                    )}
                  </>
                );
              })
            ) : (
              <div className={styles.emptyReview}>
                <span className={styles.boxInfo}>
                  {currentTab === 'writeReview'
                    ? '아직 작성 가능한 리뷰가 없어요'
                    : currentTab === 'writtenReviews'
                      ? '아직 작성한 리뷰가 없어요'
                      : '나에게 달린 리뷰가 없어요'}
                </span>
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}
