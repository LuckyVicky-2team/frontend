import { forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import { ISingleGatheringProps } from '@/types/response/GatheringListRES';
import styles from './GatheringList.module.scss';
import Card from '../Card';
import Skeleton from '../Skeleton';

interface IGatheringListProps {
  gatherings: ISingleGatheringProps[];
  isFetchingNextPage: boolean;
  status?: 'pending' | 'error' | 'success';
  refetch: () => Promise<any>;
}

export default forwardRef(function GatheringList(
  { status, gatherings, isFetchingNextPage, refetch }: IGatheringListProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <>
      <section className={`${styles.cardContainer} `}>
        {status === 'pending' ? (
          <Skeleton />
        ) : status === 'error' ? (
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
