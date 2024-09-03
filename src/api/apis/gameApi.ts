import { IGameData } from '@/types/response/Gathering';
import { axiosInstance } from '../instance';
// import axios from 'axios';

export const getGames = async (searchWord: string, page: number) => {
  const response = await axiosInstance.get<IGameData>('/boardgame', {
    params: {
      searchWord,
      page,
      // count: 10,
      // size: 5,
    },
  });
  return response.data;
};

// export const getGames = async (searchWord: string, page: number) => {
//   const response = await axios.get<IGameData>(
//     `${process.env.NEXT_PUBLIC_API_BASE_DEV_URL}/boardgame`,
//     {
//       params: {
//         searchWord,
//         page,
//         // count: 10,
//         // size: 5,
//       },
//     }
//   );
//   return response.data;
// };
