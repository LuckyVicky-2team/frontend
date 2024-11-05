'use client';

import React, { useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useClientSearchParams } from '@/hooks/useClientSearchParams';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import styles from './GatheringsPageClient.module.scss';
import Card from './_components/Card';
import Skeleton from './_components/Skeleton';
import FilterContainer from './_components/FilterContainer';
import useModal from '@/hooks/useModal';
import dynamic from 'next/dynamic';

const DynamicLoginModal = dynamic(
  () => import('@/components/common/Modal/LoginModal'),
  { ssr: false }
);

function GatheringsPageContent({ handleLoginModalOpen }: any) {
  const router = useRouter();
  const searchParams = useClientSearchParams();
  const { ref, inView } = useInView();
  const params = searchParams.get();

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
      refetchOnMount: true,
      staleTime: 0,
    });

  const gatherings = data?.pages.flat() || [];

  const handleAddNewMeeting = () => {
    const accesssToken = localStorage.getItem('accessToken');
    if (!accesssToken) {
      handleLoginModalOpen();
      return;
    }
    router.push('/gatherings/new');
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div>
        <main>
          <button
            onClick={handleAddNewMeeting}
            className={styles.addGatheringBtn}>
            <Image
              src={'/assets/icons/plusCircle.svg'}
              alt={'addIcon'}
              width={24}
              height={24}
            />
          </button>
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
  const {
    modalOpen: loginModalOpen,
    handleModalOpen: handleLoginModalOpen,
    handleModalClose: handleLoginModalClose,
  } = useModal();

  return (
    <Suspense>
      <GatheringsPageContent handleLoginModalOpen={handleLoginModalOpen} />
      <DynamicLoginModal
        modalOpen={loginModalOpen}
        onClose={handleLoginModalClose}
      />
    </Suspense>
  );
}
