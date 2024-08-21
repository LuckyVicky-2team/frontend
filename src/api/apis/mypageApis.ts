import { axiosInstance } from '../instance';

// 개인 정보 조회를 위한 API 요청
export const getPersonalInfo = () => {
  return axiosInstance.get('/personal-info');
};

// 닉네임 중복 확인을 위한 API 요청
export const checkNicknameDuplication = (nickName: string) => {
  return axiosInstance.get(`/check-nickname?nickName=${nickName}`);
};
// 개인정보 수정을 위한 API 요청
export const updatePersonalInfo = (nickName: string, password: string) => {
  return axiosInstance.patch('/personal-info', {
    nickName,
    password,
  });
};

// 프로필 이미지 수정을 위한 API 요청
export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('profileImage', file);

  const response = await axiosInstance.patch(
    '/personal-info/profile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

//pr태그 수정
export const updatePRTags = (tags: string[]) => {
  const formData = new FormData();
  tags.forEach(tag => formData.append('prTags', tag));

  return axiosInstance.patch('/personal-info/prTags', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
