import {
  IOtherEvaluationTagsResponse,
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

export const getOtherEvaluationTags = async (
  _id: number
): Promise<IOtherEvaluationTagsResponse> => {
  // const { data } = await axiosInstance.get(``);
  // return data
  return {
    positiveTags: [
      {
        evaluationTagId: 0,
        tagPhrase: '매너가 좋아요',
        evaluationType: 'POSITIVE',
        count: 12,
      },
      {
        evaluationTagId: 1,
        tagPhrase: '다시 만나고 싶어요!',
        evaluationType: 'POSITIVE',
        count: 20,
      },
      {
        evaluationTagId: 2,
        tagPhrase: '공정해요',
        evaluationType: 'POSITIVE',
        count: 20,
      },
    ],
    negativeTags: [
      {
        evaluationTagId: 3,
        tagPhrase: '시간을 안지켜요',
        evaluationType: 'NEGATIVE',
        count: 20,
      },
      {
        evaluationTagId: 4,
        tagPhrase: '재미없어요',
        evaluationType: 'NEGATIVE',
        count: 20,
      },
      {
        evaluationTagId: 5,
        tagPhrase: '의도가 부적절해요',
        evaluationType: 'NEGATIVE',
        count: 20,
      },
      {
        evaluationTagId: 6,
        tagPhrase: '다시 만나기 싫어요!',
        evaluationType: 'NEGATIVE',
        count: 20,
      },
    ],
  };
};
