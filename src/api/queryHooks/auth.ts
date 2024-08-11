import { useMutation } from '@tanstack/react-query';
import { EmailSignupFormType } from '@/types/request/authRequestTypes';
import { postEmailSignupForm } from '../apis/authApis';

export const usePostEmailSignupForm = (data: EmailSignupFormType) => {
  return useMutation({
    mutationFn: async () => await postEmailSignupForm(data),
  });
};
