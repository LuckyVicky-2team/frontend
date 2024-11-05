import { axiosInstance } from '../instance';
import {
  IReviewMeetingListRequestProps,
  IReviewMutationReqeustProps,
  IRevieweeListRequestProps,
  IMyReviewListRequestProps,
} from '@/types/request/ReviewREQ';

export const reviewAPI = {
  evaluationTags: async () => {
    const { data } = await axiosInstance.get('/evaluation-tags');
    return data;
  },

  reviewCreate: async (req: IReviewMutationReqeustProps) => {
    const { data } = await axiosInstance.post(`/my/review`, req);
    return data;
  },

  receivedReview: async () => {
    const { data } = await axiosInstance.get('/my/review');
    return data;
  },

  meetingList: async (req: IReviewMeetingListRequestProps) => {
    const { data } = await axiosInstance.get('/my/review/meetings', {
      params: req,
    });
    return data;
  },
  revieweeList: async (req: IRevieweeListRequestProps) => {
    const { meetingId } = req;
    const { data } = await axiosInstance.get(
      `/my/review/meetings/${meetingId}/participants`
    );
    return data;
  },
  myReviewList: async (req: IMyReviewListRequestProps) => {
    const { meetingId } = req;
    const { data } = await axiosInstance.get(
      `/my/review/meetings/${meetingId}`
    );
    return data;
  },
};
