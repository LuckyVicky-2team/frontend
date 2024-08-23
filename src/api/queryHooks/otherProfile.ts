import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
import {
  getOtherEvaluationTags,
  getOtherProfile,
} from '../apis/otherProfileApis';

export const useGetOtherProfile = (id: number) => {
  return useQuery({
    queryKey: QueryKey.OTHER_USER.INFO(id),
    queryFn: () => getOtherProfile(id),
  });
};

export const useGetOtherEvaluationTags = (id: number) => {
  return useQuery({
    queryKey: QueryKey.OTHER_USER.EVALUATION_TAGS(id),
    queryFn: () => getOtherEvaluationTags(id),
  });
};
