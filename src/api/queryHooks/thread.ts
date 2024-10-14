import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
import { getMyChatRooms } from '../apis/threadApis';

export const useGetMyChatrooms = () => {
  return useQuery({
    queryKey: QueryKey.USER.THREAD(),
    queryFn: () => getMyChatRooms(),
  });
};
