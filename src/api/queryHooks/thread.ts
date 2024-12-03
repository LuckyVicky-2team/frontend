import { QueryKey } from '@/utils/QueryKey';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getChattingLog,
  getGatheringInfo,
  getMyChatRooms,
  getMyInfo,
} from '../apis/threadApis';

export const useGetMyChatrooms = () => {
  return useQuery({
    queryKey: QueryKey.USER.THREAD(),
    queryFn: () => getMyChatRooms(),
    staleTime: 0,
  });
};

export const useGetChattingLog = (chatroomId: number) => {
  return useInfiniteQuery({
    queryKey: QueryKey.GATHERING.THREAD(chatroomId),
    queryFn: ({ pageParam = 0 }) => getChattingLog(chatroomId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.last) return undefined;
      return pages.length;
    },
    gcTime: 0,
  });
};

export const useGetMyInfo = (dependencyData: Object | undefined) => {
  return useQuery({
    queryKey: [QueryKey.USER.KEY, QueryKey.USER.ME],
    queryFn: () => getMyInfo(),
    enabled: !!dependencyData,
  });
};

export const useGetGatheringInfo = (gatheringId: number) => {
  return useQuery({
    queryKey: [QueryKey.GATHERING.DETAIL(gatheringId)],
    queryFn: () => getGatheringInfo(gatheringId, false),
  });
};
