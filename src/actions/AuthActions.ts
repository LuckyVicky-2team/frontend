'use server';

import { cookies } from 'next/headers';

export const getTokenFromCookie = async () => {
  let tokenCookie = cookies().get('Authorization');

  if (!tokenCookie) return;

  // 쿠키 삭제
  // cookies().set({
  //   name: 'Authorization',
  //   value: '',
  //   httpOnly: true,
  //   secure: true,
  //   path: '/',
  //   expires: new Date(0),
  // });

  // api 이용
  // try {
  //   const response = await axiosInstance.get(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/token`,
  //     {
  //       headers: {
  //         Cookie: `Authorization=${tokenCookie.value}`,
  //       },
  //     }
  //   );
  //   const token = response.headers['authorization'];
  //   return token;
  // } catch (error) {
  //   console.log(error);
  // }

  return tokenCookie.value;
};
