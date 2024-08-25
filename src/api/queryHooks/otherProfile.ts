import { QueryKey } from '@/utils/QueryKey';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  getOtherEvaluationTags,
  getOtherProfile,
} from '../apis/otherProfileApis';
import {
  IOtherEvaluationTagsResponse,
  IOtherProfileResponse,
} from '@/types/response/OtherProfileRES';

export const useGetOtherProfile = (id: number) => {
  return useSuspenseQuery<IOtherProfileResponse>({
    queryKey: QueryKey.OTHER_USER.INFO(id),
    queryFn: () => getOtherProfile(id, false),
  });
};

export const useGetOtherEvaluationTags = (id: number) => {
  return useSuspenseQuery<IOtherEvaluationTagsResponse>({
    queryKey: QueryKey.OTHER_USER.EVALUATION_TAGS(id),
    queryFn: () => getOtherEvaluationTags(id),
  });
};
