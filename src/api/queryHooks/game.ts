import { useQuery } from '@tanstack/react-query';
import { IGameData } from '@/types/response/Gathering';
import { getGames } from '../apis/gameApi';
import { getRecommendInfo } from '../apis/mypageApis';
import { QueryKey } from '@/utils/QueryKey';

export const useGameList = () => {
  const isBrowser = typeof window !== 'undefined';
  return useQuery<IGameData>({
    queryKey: QueryKey.GATHERING.GAME_LIST(),
    queryFn: () => getGames(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    enabled: isBrowser && !!localStorage.getItem('accessToken'),
  });
};

export const useRecommendGameList = (type: string) => {
  return useQuery({
    queryKey: QueryKey.RECOMMEND.GAME_LIST(type),
    queryFn: () => getRecommendInfo(type),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
