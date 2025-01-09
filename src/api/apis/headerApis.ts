import { axiosInstance } from '../instance';

// 헤더 알림 api, 알림아이콘 컨트롤 목적
export const getAlrmList = () => {
  return axiosInstance.get('/notification/list');
};
