import React from 'react';
import GatheringsPageClient from './GatheringsPageClient';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringApis';
// import { Hydrate, getDehydratedQuery} from '@/utils/react-query';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

// Not working
// export default async function GatheringsPage() {
//   const req: IGatheringListRequestProps = {
//     page: 1,
//     count: 10,
//     sortBy: 'MEETING_DATE',
//   };
//   const queryKey = QueryKey.GATHERING.LIST(req);
//   const queryFn = () => gatheringAPI.gatheringList(req);

//   const query = await getDehydratedQuery({ queryKey, queryFn });

//   return (
//     <Hydrate state={{ queries: [query] }}>
//       <GatheringsPageClient />
//     </Hydrate>
//   );
// }

export default async function GatheringsPage() {
  const queryClient = new QueryClient();
  const req: IGatheringListRequestProps = {
    page: 0,
    count: 10,
    sortBy: 'MEETING_DATE',
  };
  await queryClient.prefetchQuery({
    queryKey: QueryKey.GATHERING.LIST(req),
    queryFn: () => gatheringAPI.gatheringList(req),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GatheringsPageClient />
    </HydrationBoundary>
  );
}
