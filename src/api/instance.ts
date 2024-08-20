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
        config.headers.Authorization = accesssToken;
      }
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);
