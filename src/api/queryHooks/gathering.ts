import { useQuery } from '@tanstack/react-query';
import { getGatheringsInfo } from '../apis/gatheringsApis';
import { QueryKey } from '@/utils/QueryKey';

export const useGatheringDetails = (id: number) => {
  return useQuery({
    queryKey: [QueryKey.GATHERING.DETAIL(id)],
    queryFn: () => getGatheringsInfo(id),
  });
};
