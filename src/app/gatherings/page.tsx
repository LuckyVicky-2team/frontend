import { Suspense } from 'react';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import Skeleton from './_components/Skeleton';
import GatheringsPageClient from './GatheringsPageClient';
import GatheringList from './_components/GatheringList';
import { PrefetchBoundary } from '@/components/common/PrefetchBoundary/PrefetchBoundary';

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export default function GatheringsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const req: IGatheringListRequestProps = {
    sortBy: 'MEETING_DATE',
    ...searchParams,
  };

  return (
    <>
      <GatheringsPageClient />
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={
          <div
            style={{
              width: '80%',
              padding: '40px 0 30px 0',
              margin: 'auto',
            }}>
            <Skeleton />
          </div>
        }>
        <PrefetchBoundary
          prefetchOptions={{
            queryKey: QueryKey.GATHERING.LIST(req),
            queryFn: async ({ pageParam }: any) =>
              gatheringAPI.gatheringList({ page: pageParam, ...req }, true),
            initialPageParam: 0,
          }}>
          <GatheringList />
        </PrefetchBoundary>
      </Suspense>
    </>
  );
}
