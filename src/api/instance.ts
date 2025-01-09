import axios from 'axios';
import getNewAccessToken from '@/utils/getNewAccessToken';
import { checkRefreshToken } from '@/actions/AuthActions';
import { ICustomAxiosInterceptorConfig } from '@/types/request/authRequestTypes';
import { removeAccessToken, setAccessToken } from '@/utils/changeAccessToken';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config: ICustomAxiosInterceptorConfig) => {
    if (typeof window !== 'undefined') {
      const skipInterceptorUrl = '/signup?type=social';

      const currentUrl = window.location.href;

      if (currentUrl.includes(skipInterceptorUrl)) {
        return config;
      }

      const accessToken = localStorage.getItem('accessToken');
      const hasRefreshToken = await checkRefreshToken();

      if (accessToken) {
        config.headers.Authorization = accessToken;
        return config;
      }

      if (hasRefreshToken && !config.noInterceptors) {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          config.headers.Authorization = newAccessToken;
        }
      }
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    if (typeof window !== 'undefined') {
      if (
        (error.response?.data?.errorCode === 4010 ||
          error.response?.data?.errorCode === 4011) &&
        !error.config.noInterceptors
      ) {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
        } else {
          removeAccessToken();
          delete error.config.headers.Authorization;
        }

        return axiosInstance(error.config);
      }
    }

    return Promise.reject(error);
  }
);
