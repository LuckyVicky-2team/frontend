'use server';

import { axiosInstance } from '@/api/instance';
import { cookies } from 'next/headers';

export const reissueTokenViaServer = async () => {
  try {
    const refreshToken = cookies().get('Authorization')?.value;

    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reissue`,
      {},
      {
        headers: {
          Cookie: `Authorization=${refreshToken}`,
        },
      }
    );

    const headers = response.headers;

    return {
      at: headers.authorization,
      rt: headers['set-cookie']?.pop(),
    };
  } catch {
    return;
  }
};

export const deleteInitialRefreshToken = () => {
  cookies().delete('Authorization');
};

export const checkRefreshToken = () => {
  return !!cookies().get('Authorization');
};

export const saveRefreshToken = async (setCookieString: string) => {
  const [keyValuePair, ...attributes] = setCookieString.split('; ');
  const [key, value] = keyValuePair.split('=');

  /* eslint-disable indent */
  const cookieOptions = attributes.reduce(
    (options: { [key: string]: any }, attr) => {
      const [name, attrValue] = attr.split('=');

      switch (name.toLowerCase()) {
        case 'path':
          options.path = attrValue;
          break;
        case 'domain':
          options.domain = attrValue;
          break;
        case 'max-age':
          options.maxAge = parseInt(attrValue, 10);
          break;
        case 'expires':
          options.expires = new Date(attrValue);
          break;
        case 'secure':
          options.secure = true;
          break;
        case 'httponly':
          options.httpOnly = true;
          break;
        default:
          break;
      }

      return options;
    },
    {}
  );

  await cookies().set(key, value, cookieOptions);

  return;
};
