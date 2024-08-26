import styles from './ReviewPage.module.scss';
import GatheringItem from '../_components/GatheringItem';
import { gatheringList } from '../../mockData/mockData';
import React from 'react';

export default function ReviewPage() {
  return (
    <div className={styles.container}>
      {gatheringList?.map(item => {
        return (
          <GatheringItem
            key={item.id}
            data={item}
            buttonName="리뷰 남기기"
            href={`review/${item.id}`}
          />
        );
      })}
      {gatheringList.length === 0 && (
        <div className={styles.emptyReview}>
          <span className={styles.boxInfo}>
            아직 리뷰작성 가능한 모임이 없어요
          </span>
        </div>
      )}
    </div>
  );
}
