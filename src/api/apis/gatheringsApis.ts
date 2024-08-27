import { IGatheringDetailsResponseProps } from '@/types/response/Gathering';
import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
import { axiosInstance } from '../instance';

export const gatheringAPI = {
  getGatheringsInfo: async (id: number) => {
    const response = await axiosInstance.get<IGatheringDetailsResponseProps>(
      `/meeting/${id}`
    );
    return response.data;
  },

  gatheringList: async (req: IGatheringListRequestProps) => {
    const {
      data: { content },
    } = await axiosInstance.get(`/meeting`, {
      params: req,
    });
    return content;
  },

  joinGathering: async (id: number) => {
    return axiosInstance.post('/meeting-participant/participation', {
      meetingId: id,
    });
  },

  shareGathering: async (id: number) => {
    return axiosInstance.patch(`/meeting/share/${id}`, {
      id: id,
    });
  },

  isUserTypeQuit: async (id: number) => {
    return axiosInstance.get(`/meeting-participant/out/${id}`);
  },
};
