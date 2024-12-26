import { axiosInstance } from '../instance';

export const getMyChatRooms = async () => {
  const { data } = await axiosInstance.get(`/chatroom/list`);

  return data;
};

export const getChattingLog = async (chatRoomId: number, page: number) => {
  const { data, status, statusText } = await axiosInstance.get(
    `/chatroom?chatRoomId=${chatRoomId}&page=${page}`
  );

  return { ...data, status, statusText };
};

export const getMyInfo = async () => {
  const { data } = await axiosInstance.get('/personal-info');

  return data;
};

export const getGatheringInfo = async (
  gatheringId: number,
  isServer: boolean
) => {
  try {
    const { data } = await axiosInstance.get(
      isServer
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/meeting/${gatheringId}`
        : `/meeting/${gatheringId}`
    );

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
