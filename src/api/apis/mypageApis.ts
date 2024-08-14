import { axiosInstance } from '../instance';

// 개인 정보 조회를 위한 API 요청
export const getPersonalInfo = () => {
  return axiosInstance.get('/personal-info');
};

// 개인정보 수정을 위한 API 요청
export const updatePersonalInfo = (nickName: string, password: string) => {
  return axiosInstance.put('/personal-info', {
    nickName,
    password,
  });
};
