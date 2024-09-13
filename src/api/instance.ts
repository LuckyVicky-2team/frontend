import { checkRefreshToken, getTokenFromCookie } from '@/actions/AuthActions';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const reissueAccessToken = async () => {
        const accesssToken = localStorage.getItem('accessToken');
        const hasRefreshToken = await checkRefreshToken();

        if (accesssToken) {
          const token = accesssToken.split(' ')[1];
          const tokenPayload = JSON.parse(atob(token.split('.')[1]));
          const expiryTime = tokenPayload.exp * 1000;
          const currentTime = Date.now();

          // 액세스 토큰이 만료되었으면 액세스 토큰 재발급
          if (expiryTime < currentTime) {
            const accessToken = await getTokenFromCookie();
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
            }
            config.headers.Authorization = accesssToken;
          }

          // 리프레쉬 토큰만 있는 경우, 액세스 토큰 재발급
        } else if (hasRefreshToken) {
          const accessToken = await getTokenFromCookie();
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
          }
          config.headers.Authorization = accesssToken;
        }
      };

      reissueAccessToken();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
