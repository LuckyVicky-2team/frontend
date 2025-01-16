import { Suspense } from 'react';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import Loading from './loading';
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
      <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
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
