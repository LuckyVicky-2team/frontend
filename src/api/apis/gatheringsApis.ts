import { IGatheringDetailsResponseProps } from '@/types/response/Gathering';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { axiosInstance } from '../instance';

export const gatheringAPI = {
  getGatheringsInfo: async (id: number) => {
    try {
      const response = await axiosInstance.get<IGatheringDetailsResponseProps>(
        `/meeting/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  gatheringList: async (req: IGatheringListRequestProps) => {
    const {
      data: { content },
    } = await axiosInstance.get(`/meeting`, {
      params: req,
    });
    return content;
  },

  // joinGathering: async (id: number) => {
  //   const data = axiosInstance.post('/meeting-participant/participation', {
  //     meetingId: id,
  //   });
  // },
};
