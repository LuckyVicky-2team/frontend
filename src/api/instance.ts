import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
});

axiosInstance.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const accesssToken = localStorage.getItem('accessToken');
      if (accesssToken) {
        const token = accesssToken.split(' ')[1];
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = tokenPayload.exp * 1000;
        const currentTime = Date.now();

        // 토큰이 만료되었으면 토큰 삭제 후 로그인 화면 이동
        if (expiryTime < currentTime) {
          localStorage.removeItem('accessToken');
          window.location.href = '/signin';
          return config;
        }

        config.headers.Authorization = accesssToken;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
