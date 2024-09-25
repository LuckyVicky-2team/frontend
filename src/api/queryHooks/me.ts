import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../apis/meApi';

export const useMe = () => {
  return useQuery({
    queryKey: [QueryKey.USER.ME],
    queryFn: getMe,
    gcTime: 0,
  });
};
