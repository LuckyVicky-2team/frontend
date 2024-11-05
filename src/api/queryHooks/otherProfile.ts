import { QueryKey } from '@/utils/QueryKey';
import { useQuery } from '@tanstack/react-query';
import { getOtherProfile } from '../apis/otherProfileApis';
import {
  IOtherProfileAPIError,
  IOtherProfileResponse,
} from '@/types/response/OtherProfileRES';

export const useGetOtherProfile = (id: number) => {
  return useQuery<IOtherProfileResponse | IOtherProfileAPIError>({
    queryKey: QueryKey.OTHER_USER.INFO(id),
    queryFn: () => getOtherProfile(id, false),
  });
};
