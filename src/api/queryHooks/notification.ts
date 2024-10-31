import { QueryKey } from '@/utils/QueryKey';
import {
  getNotificationList,
  patchReadNotification,
} from '../apis/notification';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useNotificationList = () => {
  const query = useQuery({
    queryKey: [QueryKey.USER.NOTIFICATION],
    queryFn: getNotificationList,
    gcTime: 0,
  });
  return { ...query, refetch: query.refetch };
};

export const useReadNotification = () => {
  return useMutation({
    mutationFn: async (ids: number[]) => {
      return await patchReadNotification(ids);
    },
  });
};
