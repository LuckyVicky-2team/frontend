'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import useModal from '@/hooks/useModal';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import GatheringList from './_components/GatheringList';
import AddGatheringButton from './_components/AddGatheringButton';
import useQueryStrings from '@/hooks/useQueryStrings';
import Filter from './_components/Filter';

const DynamicLoginModal = dynamic(
  () => import('@/components/common/Modal/LoginModal'),
  { ssr: false }
);

function GatheringsPageContent({ handleLoginModalOpen }: any) {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { getParams, setParams, clearParams } = useQueryStrings();
  const params = getParams();

  const { data, error, fetchNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: QueryKey.GATHERING.LIST({
        // count: 10,
        ...params,
      }),
      queryFn: ({ pageParam = 0 }) =>
        gatheringAPI.gatheringList({
          // count: 10,
          page: pageParam,
          ...params,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage || lastPage.length < 10) return undefined;
        return pages.length;
      },
      staleTime: 1000 * 60 * 1,
      refetchOnMount: true,
    });

  const FilteredGatherings = data?.pages.flat() || [];

  const addNewMeeting = () => {
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
      <main>
        <AddGatheringButton handleAddNewMeeting={addNewMeeting} />
        <Filter
          clearParams={clearParams}
          filterItems={params}
          setParams={setParams}
        />

        <GatheringList
          ref={ref}
          isFetchingNextPage={isFetchingNextPage}
          status={status}
          gatherings={FilteredGatherings}
          error={error}
        />
      </main>
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
