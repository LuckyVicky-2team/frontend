import { axiosInstance } from '../instance';

export const getMyChatRooms = async () => {
  const { data } = await axiosInstance.get(`/chatroom/list`);

  return data;
};
