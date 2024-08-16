import { IGatheringDetailsResponseProps } from '@/types/response/Gathering';
import { axiosInstance } from '../instance';

export const getGatheringsInfo = async (id: number) => {
  try {
    const response = await axiosInstance.get<IGatheringDetailsResponseProps>(
      `/meeting/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
