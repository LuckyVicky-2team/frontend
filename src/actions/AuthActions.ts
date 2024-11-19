'use server';

import { cookies } from 'next/headers';

// /**
//  * 쿠키의 리프레쉬 토큰을 통해 AccessToken 을 재발급하여 반환.
//  * @returns string | undefind
//  */
// export const getTokenFromCookie = async () => {
//   const refreshToken = cookies().get('Authorization');

//   if (!refreshToken) return;

//   let accessToken;

//   try {
//     const response = await postReissueAccessToken(refreshToken.value);
//     accessToken = response.headers['authorization'];
//   } catch (error) {
//     return;
//   }

//   return accessToken;
// };

export const deleteInitialRefreshToken = () => {
  cookies().set('Authorization', '', {
    path: '/',
    domain: 'dev.app.board-go.net',
    secure: true,
    httpOnly: true,
    maxAge: 0,
  });
};

export const checkRefreshToken = () => {
  return !!cookies().get('Authorization');
};
