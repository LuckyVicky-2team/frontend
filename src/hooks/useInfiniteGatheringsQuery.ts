import { useInfiniteQuery } from '@tanstack/react-query';

import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '@/api/apis/gatheringsApis';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';

export const useInfiniteGatheringsQuery = (
  params: IGatheringListRequestProps
) => {
  return useInfiniteQuery({
    queryKey: QueryKey.GATHERING.LIST({ ...params }),
    queryFn: ({ pageParam = 0 }) =>
      gatheringAPI.gatheringList({
        page: pageParam,
        ...params,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage?.length < 10) return undefined;
      return pages?.length;
    },
    staleTime: 0, // 데이터를 항상 stale로 간주
    refetchOnMount: true,
  });
};
