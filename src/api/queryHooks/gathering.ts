import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import { gatheringAPI } from '../apis/gatheringApis';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { IGatheringListResponseProps } from '@/types/response/GatheringRES';
import { IErrorProps } from '@/types/CommonInterface';

export const useGatheringList = (req: IGatheringListRequestProps) => {
  return useQuery<IGatheringListResponseProps, IErrorProps>({
    queryKey: QueryKey.GATHERING.LIST(req),
    queryFn: () => gatheringAPI.gatheringList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};
