'use client';

import React, { useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import styles from './GatheringsPageClient.module.scss';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import { QueryKey } from '@/utils/QueryKey';
import Card from './_components/Card';
import Skeleton from './_components/Skeleton';
import FilterContainer from './_components/FilterContainer';
import { useClientSearchParams } from '@/hooks/useClientSearchParams';

function GatheringsPageContent() {
  const searchParams = useClientSearchParams();
  const { ref, inView } = useInView();
  const params = searchParams.get();

  // TODO @haewon
  // verify logged in user
  // 로그인한 유저 -> 유저정보 가져옴 , 로그인x, 비회원 -> localStorage 정보가져옴

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: QueryKey.GATHERING.LIST({
        count: 10,
        ...params,
      }),
      queryFn: ({ pageParam = 0 }) =>
        gatheringAPI.gatheringList({
          count: 10,
          page: pageParam,
          ...params,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage || lastPage.length < 10) return undefined;
        return pages.length;
      },
    });

  const gatherings = data?.pages.flatMap(page => page) || [];

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div>
        <main>
          <Link href={'/gatherings/new'}>
            <button className={styles.addGatheringBtn}>
              <Image
                src={'/assets/icons/plusCircle.svg'}
                alt={'addIcon'}
                width={24}
                height={24}
              />
            </button>
          </Link>

          <FilterContainer />

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
                {/* 찜 버튼 - 사용자 식별 필요 && backend api 생성 대기중*/}
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
        </main>
      </div>
    </>
  );
}
export default function GatheringsPageClient() {
  return (
    <Suspense>
      <GatheringsPageContent />
    </Suspense>
  );
}
