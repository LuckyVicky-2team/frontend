import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
import {
  getOtherEvaluationTags,
  getOtherProfile,
} from '../apis/otherProfileApis';
import {
  IOtherEvaluationTagsResponse,
  IOtherProfileAPIError,
  IOtherProfileResponse,
} from '@/types/response/OtherProfileRES';

export const useGetOtherProfile = (id: number) => {
  return useQuery<IOtherProfileResponse | IOtherProfileAPIError>({
    queryKey: QueryKey.OTHER_USER.INFO(id),
    queryFn: () => getOtherProfile(id, false),
  });
};

export const useGetOtherEvaluationTags = (id: number) => {
  return useQuery<IOtherEvaluationTagsResponse>({
    queryKey: QueryKey.OTHER_USER.EVALUATION_TAGS(id),
    queryFn: () => getOtherEvaluationTags(id),
  });
};
