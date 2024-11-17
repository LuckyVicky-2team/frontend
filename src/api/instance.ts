import axios from 'axios';
import getNewAccessToken from '@/utils/getNewAccessToken';
import { checkRefreshToken } from '@/actions/AuthActions';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
  withCredentials: true,
});

let isRefreshing = false;

axiosInstance.interceptors.request.use(
  async config => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const hasRefreshToken = await checkRefreshToken();

      if (accessToken) {
        config.headers.Authorization = accessToken;
        return config;
      }

      if (hasRefreshToken && isRefreshing === false) {
        isRefreshing = true;

        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
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
        isRefreshing === false
      ) {
        isRefreshing = true;
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
        } else {
          localStorage.removeItem('accessToken');
          window.location.href = '/signin';
        }
      }
    }

    return Promise.reject(error);
  }
);
