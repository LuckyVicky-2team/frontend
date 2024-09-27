import {
  IOtherProfileAPIError,
  IOtherProfileResponse,
} from '@/types/response/OtherProfileRES';
import { axiosInstance } from '../instance';

export const getOtherProfile = async (
  id: number,
  isServer: boolean
): Promise<IOtherProfileResponse | IOtherProfileAPIError> => {
  try {
    const { data } = await axiosInstance.get(
      isServer
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/personal-info/${id}`
        : `/personal-info/${id}`
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
