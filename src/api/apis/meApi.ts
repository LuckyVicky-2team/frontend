import { axiosInstance } from '../instance';

export const getMe = async () => {
  const response = await axiosInstance.get<number>('/me');
  return response.data;
};
