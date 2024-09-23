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
};

export type SigninFormType = {
  username: string;
  password: string;
};

export type ConsentFormType = {
  termsConditionsType: string;
  agreement: boolean;
}[];
