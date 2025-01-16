import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';

import GatheringListClient from './GatheringListClient';
import { SearchParams } from '../../page';

export default async function GatheringListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const queryClient = new QueryClient();

  const req: IGatheringListRequestProps = {
    sortBy: 'MEETING_DATE',
    ...searchParams,
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: QueryKey.GATHERING.LIST(req),
    queryFn: ({ pageParam }) =>
      gatheringAPI.gatheringList(
        {
          page: pageParam,
          ...req,
        },
        true
      ),
    initialPageParam: 0,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <GatheringListClient />
    </HydrationBoundary>
  );
}
