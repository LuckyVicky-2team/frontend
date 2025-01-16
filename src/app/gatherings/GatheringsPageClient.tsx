'use client';

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import AddGatheringButton from './_components/AddGatheringButton';
import useQueryStrings from '@/hooks/useQueryStrings';
import useModal from '@/hooks/useModal';
import styles from './Gatherings.module.scss';
import Filter from './_components/Filter';
import Skeleton from './_components/Skeleton';
import LoginModal from '@/components/common/Modal/LoginModal';

interface IGatheringPageClientProps {
  prefetchGatheringPage: React.ReactNode;
}

export default function GatheringsPageClient({
  prefetchGatheringPage,
}: IGatheringPageClientProps) {
  const router = useRouter();

  const { getParams, setParams, clearParams } = useQueryStrings();
  const params = getParams();

  const {
    modalOpen: loginModalOpen,
    handleModalOpen: handleLoginModalOpen,
    handleModalClose: handleLoginModalClose,
  } = useModal();

  const addNewMeeting = () => {
    const accesssToken = localStorage.getItem('accessToken');
    if (!accesssToken) {
      handleLoginModalOpen();
      return;
    }
    router.push('/gatherings/new');
  };

  return (
    <>
      <main>
        <AddGatheringButton handleAddNewMeeting={addNewMeeting} />
        <Filter
          clearParams={clearParams}
          filterItems={params}
          setParams={setParams}
        />
        <Suspense
          key={JSON.stringify(params)}
          fallback={
            <div className={styles.fallbackSkeleton}>
              <Skeleton />
            </div>
          }>
          {prefetchGatheringPage}
        </Suspense>
      </main>
      <LoginModal modalOpen={loginModalOpen} onClose={handleLoginModalClose} />
    </>
  );
}
