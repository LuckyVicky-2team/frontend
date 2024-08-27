import { axiosInstance } from '../instance';

export const postWishList = (gatheringsList: number[]) => {
  let gatheringsQuery: string = '';

  gatheringsList.forEach((gathering, index) => {
    if (index === 0) {
      gatheringsQuery += gathering;
    } else {
      gatheringsQuery += `,${gathering}`;
    }
  });

  return axiosInstance.post(`/meeting/like?meetingIdList=${gatheringsQuery}`);
};

export const deleteWishList = (gatheringId: number) => {
  return axiosInstance.delete(`/meeting/like/${gatheringId}`);
};

export const getWishList = async () => {
  const { data } = await axiosInstance.get('/my/meeting/like');

  return data;
};
