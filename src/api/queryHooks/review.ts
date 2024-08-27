import {
  useQuery,
  keepPreviousData,
  // useQueryClient,
  // useMutation,
} from '@tanstack/react-query';
import { QueryKey } from '@/utils/QueryKey';
import { IErrorProps } from '@/types/CommonInterface';
import { reviewAPI } from '../apis/reviewApis';
import { IEvaluationTagsResponseProps } from '@/types/response/ReviewRES';

export const useEvaluationTagList = () => {
  return useQuery<IEvaluationTagsResponseProps, IErrorProps>({
    queryKey: QueryKey.REVIEW.TAGLIST(),
    queryFn: () => reviewAPI.getEvaluationTags(),
    staleTime: 60 * 1000 * 30,
    placeholderData: keepPreviousData,
  });
};

// export const useReviewCreate = () => {
//   const queryClient = useQueryClient();
//   return useMutation(reviewAPI.reviewCreate, {
//     onSettled: async () => {
//       await queryClient.invalidateQueries({
//         predicate: query => {
//           return query.queryKey[0] === QueryKey.REVIEW.KEY;
//         },
//       });
//     },
//   });
// };
