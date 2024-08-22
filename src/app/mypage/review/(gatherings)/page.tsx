import styles from '../Layout.module.scss';
import GatheringItem from '../_components/GatheringItem';
import { gatheringList } from '../../mockData/mockData';
import React from 'react';

export default function ReviewPage() {
  return (
    <>
      {gatheringList?.map(item => {
        const {
          thumbnail,
          title,
          city,
          county,
          gatheringDate,
          id,
          participants,
        } = item;
        return (
          <GatheringItem
            key={item.id}
            {...{
              thumbnail,
              title,
              city,
              county,
              gatheringDate,
              id,
              participants,
            }}
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
    </>
  );
}
