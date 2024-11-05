import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
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

export const useGetChattingLog = (chatroomId: number, page: number) => {
  return useQuery({
    queryKey: QueryKey.GATHERING.THREAD(chatroomId),
    queryFn: () => getChattingLog(chatroomId, page),
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
