import { useQuery, keepPreviousData, useMutation } from '@tanstack/react-query';
import { gatheringAPI } from '../apis/gatheringsApis';
import { QueryKey } from '@/utils/QueryKey';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { IGatheringListResponseProps } from '@/types/response/GatheringRES';
import { IErrorProps } from '@/types/CommonInterface';

export const useGatheringDetails = (id: number) => {
  return useQuery({
    queryKey: [QueryKey.GATHERING.DETAIL(id)],
    queryFn: () => gatheringAPI.getGatheringsInfo(id),
  });
};

export const useGatheringList = (req: IGatheringListRequestProps) => {
  return useQuery<IGatheringListResponseProps, IErrorProps>({
    queryKey: QueryKey.GATHERING.LIST(req),
    queryFn: () => gatheringAPI.gatheringList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const usePostJoinGathering = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await gatheringAPI.joinGathering(id);
    },
  });
};

export const usePatchShareGathering = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      return await gatheringAPI.shareGathering(id);
    },
  });
};
