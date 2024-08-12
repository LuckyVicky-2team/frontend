export type EmailSignupFormType = {
  email: string;
  nickName: string;
  password: string;
  prTags: string[];
  providerType: 'LOCAL';
};

export type SocialSignupFormType = {
  nickName: string;
  prTags: string[];
};

export type SigninFormType = {
  username: string;
  password: string;
};
