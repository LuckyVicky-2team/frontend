import { forwardRef, ForwardedRef } from 'react';
import styles from './GatheringList.module.scss';
import Card from '../Card';
import Skeleton from '../Skeleton';
import { ISingleGatheringProps } from '@/types/response/GatheringListRES';

interface IGatheringListProps {
  gatherings: ISingleGatheringProps[];
  error?: any;
  isFetchingNextPage?: boolean;
  status?: 'pending' | 'error' | 'success';
}

export default forwardRef(function GatheringList(
  { status, gatherings, isFetchingNextPage, error = null }: IGatheringListProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  // ({
  //   status,
  //   gatherings,
  //   isFetchingNextPage,
  //   intersectionDetectorRef,
  //   error = null,
  // }: IGatheringListProps)
  return (
    <>
      <section className={`${styles.cardContainer} `}>
        {status === 'pending' ? (
          <Skeleton />
        ) : status === 'error' ? (
          <div className={styles.empty}>
            <p className={styles.emptyContent}>
              Error Message : {error.message}
            </p>
          </div>
        ) : gatherings.length ? (
          <section className={styles.cardContainer}>
            {gatherings.map(el => {
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
