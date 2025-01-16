'use client';

import { forwardRef, useEffect } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useInfiniteGatheringsQuery } from '@/hooks/useInfiniteGatheringsQuery';
import useQueryStrings from '@/hooks/useQueryStrings';
import styles from './GatheringList.module.scss';
import Card from '../Card';
import Skeleton from '../Skeleton';

export default forwardRef(function GatheringListClient() {
  const { getParams } = useQueryStrings();
  const { ref, inView } = useInView();
  const params = getParams();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
    isError,
    isPending,
  } = useInfiniteGatheringsQuery(params);

  const gatherings = data?.pages?.flat() || [];

  const filteredGatherings = gatherings.filter(gathering => {
    const meetingDate = new Date(gathering.meetingDate);
    const now = new Date();
    return meetingDate >= now;
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <section className={`${styles.cardContainer} `}>
        {isPending && isFetching ? (
          <Skeleton />
        ) : isError ? (
          <div className={styles.empty}>
            <p className={styles.emptyContent}>
              모임 목록을 불러오는 데 문제가 발생했습니다
            </p>

            <div className={styles.retryButton} onClick={() => refetch()}>
              <Image
                alt="retry-button"
                src={'/assets/icons/arrow-retry.svg'}
                width={20}
                height={20}
              />
              <div className={styles.label}>다시 시도</div>
            </div>
          </div>
        ) : gatherings.length ? (
          <section className={styles.cardContainer}>
            {filteredGatherings.map(el => {
              return <Card key={el.id} {...el} />;
            })}
            {isFetchingNextPage ? <Skeleton /> : <div ref={ref}></div>}
          </section>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyContent}>
              앗 조건에 해당하는 모임이 없어요!
            </p>
          </div>
        )}
      </section>
    </>
  );
});
