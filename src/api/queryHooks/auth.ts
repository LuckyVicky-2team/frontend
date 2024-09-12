import { useMutation } from '@tanstack/react-query';
import {
  EmailSignupFormType,
  SocialSignupFormType,
} from '@/types/request/authRequestTypes';
import {
  postEmailSignupForm,
  postReissueAccessToken,
  postSigninForm,
  postSocialSignupForm,
} from '../apis/authApis';

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
