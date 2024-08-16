import { axiosInstance } from '../instance';

import { IGatheringListRequestProps } from '@/types/request/GatheringREQ';
export const gatheringAPI = {
  gatheringList: async (req: IGatheringListRequestProps) => {
    const {
      data: { content },
    } = await axiosInstance.get(`/meeting`, {
      params: req,
    });
    return content;
  },
};
