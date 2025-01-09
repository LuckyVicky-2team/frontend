import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../apis/meApi';

export const useMe = () => {
  const hasAuth = Boolean(localStorage.getItem('accessToken'));

  const { data, isError, isPending, isLoading } = useQuery({
    queryKey: [QueryKey.USER.ME],
    queryFn: getMe,
    enabled: hasAuth, // accessToken이 없을 때만 쿼리 실행
  });

  return {
    data: hasAuth ? data : null,
    isError,
    isPending: hasAuth ? isPending : false,
    isLoading: hasAuth ? isLoading : false,
  };
};
