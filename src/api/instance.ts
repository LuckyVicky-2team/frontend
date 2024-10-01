import { checkRefreshToken, getTokenFromCookie } from '@/actions/AuthActions';
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

axiosInstance.interceptors.request.use(
  async config => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      const hasRefreshToken = await checkRefreshToken();

      if (accessToken) {
        const token = accessToken.split(' ')[1];
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = tokenPayload.exp * 1000;
        const currentTime = Date.now();

        // 액세스 토큰이 만료되었으면 액세스 토큰 재발급
        if (expiryTime < currentTime) {
          const newAccessToken = await getTokenFromCookie();
          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
            config.headers.Authorization = newAccessToken;
            return config;
          }
        }

        config.headers.Authorization = accessToken;

        // 리프레쉬 토큰만 있는 경우, 액세스 토큰 재발급
      } else if (hasRefreshToken) {
        const newAccessToken = await getTokenFromCookie();
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
        }
        config.headers.Authorization = newAccessToken;
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
