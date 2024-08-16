import { useQuery } from '@tanstack/react-query';
import { getGatheringsInfo } from '../apis/gatheringsApis';

export const useGatheringDetails = (id: number) => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getGatheringsInfo(id),
  });
};
