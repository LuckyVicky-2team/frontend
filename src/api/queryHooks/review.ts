import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import { IErrorProps } from '@/types/CommonInterface';
import { reviewAPI } from '../apis/reviewApis';
import {
  IEvaluationTagsResponseProps,
  ISingleMeetingResponseProps,
  ISingleMyReviewResponseProps,
  IReceivedReviewResponseProps,
} from '@/types/response/ReviewRES';
import {
  IRevieweeListRequestProps,
  IReviewMeetingListRequestProps,
  IMyReviewListRequestProps,
} from '@/types/request/ReviewREQ';

export const useEvaluationTagList = () => {
  return useQuery<IEvaluationTagsResponseProps, IErrorProps>({
    queryKey: QueryKey.REVIEW.TAG_LIST(),
    queryFn: () => reviewAPI.evaluationTags(),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const useMeetingList = (req: IReviewMeetingListRequestProps) => {
  return useQuery<ISingleMeetingResponseProps[], IErrorProps>({
    queryKey: QueryKey.REVIEW.MEETING_LIST(),
    queryFn: () => reviewAPI.meetingList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const useWrittenMeetingList = (req: IReviewMeetingListRequestProps) => {
  return useQuery<ISingleMeetingResponseProps[], IErrorProps>({
    queryKey: QueryKey.REVIEW.WRITTEN_MEETING_LIST(),
    queryFn: () => reviewAPI.meetingList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const useRevieweeList = (req: IRevieweeListRequestProps) => {
  return useQuery<ISingleMeetingResponseProps[], IErrorProps>({
    queryKey: QueryKey.REVIEW.REVIEWEE_LIST(req.meetingId),
    queryFn: () => reviewAPI.revieweeList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const useMyReviewList = (req: IMyReviewListRequestProps) => {
  return useQuery<ISingleMyReviewResponseProps[], IErrorProps>({
    queryKey: QueryKey.REVIEW.WRITTEN_MEETING_LIST_REVIEWEE_LIST(req.meetingId),
    queryFn: () => reviewAPI.myReviewList(req),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

export const useReviewCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reviewAPI.reviewCreate,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey[0] === QueryKey.REVIEW.KEY;
        },
      });
    },
  });
};

export const useReceivedReview = () => {
  return useQuery<IReceivedReviewResponseProps>({
    queryKey: QueryKey.REVIEW.RECEIVED_REVIEW(),
    queryFn: () => reviewAPI.receivedReview(),
    staleTime: 60 * 1000 * 30,
  });
};
