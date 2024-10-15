import { INotification } from '@/types/response/notification';
import { axiosInstance } from '../instance';

export const getNotificationList = async () => {
  const response =
    await axiosInstance.get<INotification[]>('/notification/list');
  return response.data;
};

export const patchReadNotification = async (ids: Number[]) => {
  const encodedString = encodeURIComponent(ids.join(','));
  const response = await axiosInstance.patch(
    `/notification/read?ids=${encodedString}`
  );
  return response.data;
};

export const patchPushToken = async (token: string) => {
  const response = await axiosInstance.patch('/push-token', {
    pushToken: token,
  });
  return response;
};
