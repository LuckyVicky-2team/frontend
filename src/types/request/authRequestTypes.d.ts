import {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

export type EmailSignupFormType = {
  email: string;
  nickName: string;
  password: string;
  prTags: string[];
  providerType: 'LOCAL';
  termsConditions: ConsentFormType;
};

export type SocialSignupFormType = {
  nickName: string;
  prTags: string[];
  termsConditions: {
    termsConditionsType: string;
    agreement: boolean;
  }[];
};

export type SigninFormType = {
  username: string;
  password: string;
};

export type ConsentFormType = {
  termsConditionsType: string;
  agreement: boolean;
}[];

export interface ICustomAxiosInterceptorConfig
  extends InternalAxiosRequestConfig {
  noInterceptors?: boolean;
}

export interface ICustomAxiosRequestConfig extends AxiosRequestConfig {
  noInterceptors?: boolean;
}
