import { getTokenFromCookie } from '@/actions/AuthActions';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },

  async error => {
    if (typeof window !== 'undefined') {
      if (
        error.response?.data?.errorCode === 4010 ||
        error.response?.data?.errorCode === 4011
      ) {
        const newAccessToken = await getTokenFromCookie();

        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
        } else {
          localStorage.removeItem('accessToken');
          window.location.href = '/signin';
          console.log(error);
        }
      }
    }

    return Promise.reject(error);
  }
);
