import { useRecommendGameList } from '@/api/queryHooks/game';
import { useMemo } from 'react';

export interface IRecommendInfo {
  title: string;
  thumbnail: string;
  minPlaytime: number;
  maxPlaytime: number;
  genres: string[];
  minPeople: number;
  maxPeople: number;
}

export const useFilteredRecommendGames = (
  filterType: 'two' | 'three' | 'many' | 'all' | string
) => {
  const { data, isPending, isError } = useRecommendGameList();

  const filteredGames = useMemo(() => {
    if (!data) return [];
    if (['two', 'three', 'many', 'all'].includes(filterType)) {
      /* eslint-disable indent */
      switch (filterType) {
        case 'two':
          return data.filter((game: IRecommendInfo) => game.maxPeople <= 2);
        case 'three':
          return data.filter((game: IRecommendInfo) => game.maxPeople === 3);
        case 'many':
          return data.filter((game: IRecommendInfo) => game.minPeople >= 4);
        case 'all':
        default:
          return data; // 전체 데이터 반환
      }
    } else {
      const searchQuery = decodeURIComponent(filterType);
      return data.filter(
        (game: IRecommendInfo) =>
          game.title.includes(searchQuery) || // 제목에 검색어 포함 여부 확인
          game.genres.some(genre => genre.includes(searchQuery)) // 장르에 검색어 포함 여부 확인
      );
    }
  }, [data, filterType]);

  return { filteredGames, isPending, isError };
};
