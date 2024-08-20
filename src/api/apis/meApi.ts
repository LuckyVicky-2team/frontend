import { axiosInstance } from '../instance';

export const getMe = async () => {
  try {
    const response = await axiosInstance.get<number>('/me');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
