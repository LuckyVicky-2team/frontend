import { useMutation, useQuery } from '@tanstack/react-query';
import {
  ConsentFormType,
  EmailSignupFormType,
  SocialSignupFormType,
} from '@/types/request/authRequestTypes';
import {
  getTermsAgreement,
  postEmailSignupForm,
  postReissueAccessToken,
  postSigninForm,
  postSocialSignupForm,
  postTermsAgreement,
} from '../apis/authApis';
import { QueryKey } from '@/utils/QueryKey';

export const usePostSigninForm = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      return await postSigninForm(data);
    },
  });
};

export const usePostEmailSignupForm = () => {
  return useMutation({
    mutationFn: async (data: EmailSignupFormType) =>
      await postEmailSignupForm(data),
  });
};

export const usePostSocialSignupForm = () => {
  return useMutation({
    mutationFn: async ({
      data,
      token,
    }: {
      data: SocialSignupFormType;
      token: string;
    }) => {
      await postSocialSignupForm(data, token);
    },
  });
};

export const usePostReissueAccessToken = () => {
  return useMutation({
    mutationFn: async () => await postReissueAccessToken(),
  });
};

export const useGetTermsAgreement = (required: boolean | 'all') => {
  return useQuery({
    queryKey: [QueryKey.TERMS_CONDITION],
    queryFn: async () => await getTermsAgreement(required),
  });
};

export const usePostTermsAgreement = () => {
  return useMutation({
    mutationFn: async (data: ConsentFormType) => await postTermsAgreement(data),
  });
};
