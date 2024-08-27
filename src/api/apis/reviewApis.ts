import { axiosInstance } from '../instance';
import {
  // IReviewMeetingList,
  IReviewMutationReqeustProps,
} from '@/types/request/ReviewREQ';

export const reviewAPI = {
  getEvaluationTags: async () => {
    const { data } = await axiosInstance.get('/evaluation-tags');
    return data;
  },
  reviewCreate: async (req: IReviewMutationReqeustProps) => {
    const { data } = await axiosInstance.post(`/my/review`, req);
    return data;
  },
  //@haewon 추후 사용
  // meetingList: async (req: IReviewMeetingList) => {
  //   const {
  //     data: { content },
  //   } = await axiosInstance.get('/my/review/meetings');
  // },
};
