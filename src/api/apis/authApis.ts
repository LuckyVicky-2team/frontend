import { axiosInstance } from '../instance';
import {
  ConsentFormType,
  EmailSignupFormType,
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

export const postReissueAccessToken = (refreshToken: string) => {
  return axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reissue`,
    {},
    {
      headers: {
        Cookie: `Authorization=${refreshToken}`,
      },
    }
  );
};
// export const postReissueAccessToken = () => {
//   return axiosInstance.post(`/reissue`);
// };

export const getTermsAgreement = (required: boolean | 'all') => {
  const query = required === 'all' ? 'TRUE,FALSE' : required ? 'TRUE' : 'FALSE';

  return axiosInstance.get(`/terms-conditions?required=${query}`);
};

export const postTermsAgreement = (data: ConsentFormType) => {
  return axiosInstance.post('/terms-conditions/user', data);
};
