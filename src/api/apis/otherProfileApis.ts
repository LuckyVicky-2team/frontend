import { axiosInstance } from '../instance';

export const getOtherProfile = async (id: number) => {
  return await axiosInstance.get(`/personal-info/${id}`);
};

export const getOtherEvaluationTags = async (_id: number) => {
  // return await axiosInstance.get(``);
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
