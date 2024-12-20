import { axiosInstance } from '../instance';
import {
  ConsentFormType,
  EmailSignupFormType,
  ICustomAxiosRequestConfig,
  SocialSignupFormType,
} from '@/types/request/authRequestTypes';

export const postSigninForm = (formData: FormData) => {
  return axiosInstance.post('/login', formData, {
    headers: {
      'Content-Type': 'mulitpart/form-data',
    },
  });
};

export const postEmailSignupForm = (data: EmailSignupFormType) => {
  return axiosInstance.post('/signup', data);
};

export const getEmailDupCheck = (email: string) => {
  return axiosInstance.get(`/check-email?email=${email}`);
};

export const getNickNameDupCheck = (nickName: string) => {
  return axiosInstance.get(`/check-nickname?nickName=${nickName}`);
};

export const postSocialSignupForm = (
  data: SocialSignupFormType,
  token: string
) => {
  return axiosInstance.post('/social/signup', data, {
    headers: {
      Authorization: token,
    },
  });
};

export const postRenewAccessToken = () => {
  return axiosInstance.post(`/reissue`, {}, {
    noInterceptors: true,
  } as ICustomAxiosRequestConfig);
};

export const getTermsAgreement = async (
  required: boolean | 'all',
  isServer: boolean
) => {
  const query = required === 'all' ? 'TRUE,FALSE' : required ? 'TRUE' : 'FALSE';

  try {
    const { data } = await axiosInstance.get(
      isServer
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/terms-conditions?required=${query}`
        : `/terms-conditions?required=${query}`
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const postTermsAgreement = (data: ConsentFormType) => {
  return axiosInstance.post('/terms-conditions/user', data);
};

export const postLogout = () => {
  fetch('https://dev.app.board-go.net/api/logout', {
    method: 'POST',
  });
};
