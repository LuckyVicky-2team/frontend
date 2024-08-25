import { axiosInstance } from '../instance';

interface IGenre {
  id: number;
  title: string;
}

interface IGame {
  id: number;
  title: string;
  thumbnail: string;
  genres: IGenre[];
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: number;
  unpaged: number;
}

interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface IGameData {
  content: IGame[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: ISort;
  numberOfElements: number;
  empty: boolean;
}

export const getGames = async (searchWord: string, page: number) => {
  const response = await axiosInstance.get<IGameData>(
    `/boardgame?searchWord=${searchWord}&page=${page}`
  );
  return response.data;
};
