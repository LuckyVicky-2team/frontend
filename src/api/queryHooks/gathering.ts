import { useQuery } from '@tanstack/react-query';
import { getGatheringsInfo } from '../apis/gatheringsApis';

export const useGatheringDetails = () => {
  return useQuery({ queryKey: ['posts'], queryFn: getGatheringsInfo });
};
