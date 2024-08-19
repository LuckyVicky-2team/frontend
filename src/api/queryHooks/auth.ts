import { useMutation } from '@tanstack/react-query';
import {
  EmailSignupFormType,
  SocialSignupFormType,
} from '@/types/request/authRequestTypes';
import {
  postEmailSignupForm,
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
    mutationFn: async (data: SocialSignupFormType) => {
      await postSocialSignupForm(data);
    },
  });
};
