import { IGatheringDetailsResponseProps } from '@/types/response/Gathering';
import {
  IGatheringListRequestProps,
  IKickInfoProps,
} from '@/types/request/GatheringREQ';
import { axiosInstance, axiosInstanceNoAuth } from '../instance';

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
    } = await axiosInstanceNoAuth.get(`/meeting`, {
      params: req,
    });
    return content;
  },

  joinGathering: async (id: number) => {
    return axiosInstance.post('/meeting-participant/participation', {
      meetingId: id,
    });
  },

  completeGathering: async (id: number) => {
    return axiosInstance.patch(`meeting/complete/${id}`, {
      id: id,
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

  kickParticipant: async (req: IKickInfoProps) => {
    const { userId, meetingId, meetingState } = req;
    const { data } = await axiosInstance.patch(
      `/meeting-participant/out/${userId}`,
      {
        meetingId,
        meetingState,
      }
    );

    return data;
  },
  deleteGathering: async (gatheringId: number) => {
    return axiosInstance.delete(`/meeting/${gatheringId}`);
  },
  createGathering: async (formData: FormData) => {
    const response = await axiosInstance.post('/meeting', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  },
  updateGathering: async (formData: FormData) => {
    const { data } = await axiosInstance.patch('/meeting', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
};
