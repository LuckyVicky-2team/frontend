import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Version': 1,
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const accesssToken = localStorage.getItem('accessToken');

    if (accesssToken) {
      config.headers.Authorization = accesssToken;
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);
