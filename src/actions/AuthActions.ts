'use server';

import { postReissueAccessToken } from '@/api/apis/authApis';
import { cookies } from 'next/headers';

export const getTokenFromCookie = async () => {
  const refreshToken = cookies().get('Authorization');

  if (!refreshToken) return;

  let accessToken;

  try {
    const response = await postReissueAccessToken(refreshToken.value);
    accessToken = response.headers['authorization'];
  } catch (error) {
    return;
  }

  return accessToken;
};

export const checkRefreshToken = async () => {
  const refreshToken = await cookies().get('Authorization');

  return !!refreshToken;
};
