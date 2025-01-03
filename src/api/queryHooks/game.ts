import { useQuery } from '@tanstack/react-query';
import { IGameData } from '@/types/response/Gathering';
import { getGames } from '../apis/gameApi';
import { getRecommendInfo } from '../apis/mypageApis';
import { QueryKey } from '@/utils/QueryKey';

export const useGameList = () => {
  return useQuery<IGameData>({
    queryKey: QueryKey.GATHERING.GAME_LIST(),
    queryFn: () => getGames(),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    meta: { persist: true },
    enabled: !!localStorage.getItem('accessToken'),
  });
};

export const useRecommendGameList = () => {
  return useQuery({
    queryKey: QueryKey.MYPAGE.GAME_LIST(),
    queryFn: () => getRecommendInfo('ALL'),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    meta: { persist: true },
  });
};
