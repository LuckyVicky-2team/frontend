'use client';

import { useEffect } from 'react';
import { useGatheringDetails } from '@/api/queryHooks/gathering';
import { useMe } from '@/api/queryHooks/me';
import styles from './EditGatheringPageClient.module.scss';
import GatheringForm from '../_components/GatheringForm';
import { notFound } from 'next/navigation';
import Spinner from '@/components/common/Spinner';

interface IEditGatheringPageClientProps {
  gatheringId: number;
}
export default function EditGatheringPageClient({
  gatheringId,
}: IEditGatheringPageClientProps) {
  const {
    data,
    status,
    isLoading: isLoadingGathering,
  } = useGatheringDetails(gatheringId);
  const { data: dataMe, isLoading: isLoadingMe } = useMe();

  const isLoading = isLoadingGathering || isLoadingMe;

  useEffect(() => {
    if (!isLoading) {
      const leaderId = data?.userParticipantResponseList.find(
        el => el.type === 'LEADER'
      )?.userId;

      if (leaderId !== dataMe) {
        return notFound();
      }
    }
  }, [isLoading, data, dataMe]);

  return (
    <div className={styles.body}>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <GatheringForm mode={'edit'} initialData={data} status={status} />
      )}
    </div>
  );
}
