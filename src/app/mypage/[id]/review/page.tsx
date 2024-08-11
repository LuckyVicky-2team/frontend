'use client';

import { MouseEvent, useState } from 'react';
import styles from './Review.module.scss';
import BackButton from '@/components/common/BackButton';
import GatheringItem from './_components/GatheringItem';
import WrittenReviewItem from './_components/WrittenReviewItem';
import ReceivedReviewItem from './_components/ReceivedReviewItem';
import {
  gatheringList,
  writtenReviewList,
  receivedReviewList,
} from '../../mockData';

export default function ReviewPage() {
  const [currentTab, setCurrentTab] = useState('writeReview');
  const changeUnderLine = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.value);
  };

  const list = currentTab === 'writeReview' ? gatheringList : writtenReviewList;

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
          <div className={styles.reviewContainer}>
            {currentTab === 'receivedReviews' && (
              <ReceivedReviewItem
                goodManners={receivedReviewList.goodMannersList}
                badManners={receivedReviewList.badMannersList}
              />
            )}
            {currentTab === 'writeReview' &&
              gatheringList?.map(item => (
                <GatheringItem key={item.id} item={item} />
              ))}
            {currentTab === 'writtenReviews' &&
              writtenReviewList?.map(item => (
                <WrittenReviewItem key={item.id} item={item} />
              ))}
            {list.length === 0 && (
              <div className={styles.emptyReview}>
                <span className={styles.boxInfo}>
                  {currentTab === 'writeReview'
                    ? '아직 작성 가능한 리뷰가 없어요'
                    : '아직 작성한 리뷰가 없어요'}
                </span>
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}
