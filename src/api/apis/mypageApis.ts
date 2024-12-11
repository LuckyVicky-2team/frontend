import { axiosInstance } from '../instance';

// 개인 정보 조회를 위한 API 요청
export const getPersonalInfo = () => {
  return axiosInstance.get('/personal-info');
};
// 내모임에서 개인 정보 조회를 위한 API 요청
export const getPersonalInfoMyGatherings = () => {
  return axiosInstance.get('/me');
};

// 모임 나가기를 위한 API 요청
export const outMeeting = (id: string) => {
  return axiosInstance.patch('/meeting-participant/out', {
    meetingId: id,
    meetingState: 'PROGRESS',
  });
};

// 모임 삭제를 위한 API 요청
export const deleteMeeting = (id: string) => {
  return axiosInstance.delete(`/meeting/${id}`);
};

// 상황별 추천 조회를 위한 API 요청
export const getRecommendInfo = (type: string) => {
  return axiosInstance.get(`/home/situation?situationType=${type}`);
};
// 보드게임 검색 함수
export const searchBoardGames = (
  searchWord: string,
  page: number = 1,
  size: number = 10
) => {
  return axiosInstance.get('/boardgame', {
    params: {
      searchWord,
      page,
      size,
    },
  });
};
// 나의모임 목록 조회 함수
export const getPersonalGatherings = (filter: string) => {
  return axiosInstance.get(`/my/meeting?filter=${filter}`);
};

//나의모임 목록 조회 함수
export const getMeetingList = () => {
  return axiosInstance.get(`/meeting`);
};
//나의 찜한모임 목록 조회 함수
export const getLikeList = () => {
  return axiosInstance.get(`/my/meeting/like`);
};
//약관동의 설정 페이지 함수
export const postAgree = (termsConditionsType: string, agreement: boolean) => {
  return axiosInstance.post(`/terms-conditions/user`, {
    termsConditionsType: termsConditionsType,
    agreement: agreement,
  });
};

// 게임 랭크 조회 함수
export const getGameRank = () => {
  return axiosInstance.get(`/home/cumulative-popularity`);
};

// 닉네임 중복 확인을 위한 API 요청
export const checkNicknameDuplication = (nickName: string) => {
  return axiosInstance.get(`/check-nickname?nickName=${nickName}`);
};
// 개인정보 수정을 위한 API 요청
export const updatePersonalInfo = (nickName: string, password?: string) => {
  const payload: { nickName: string; password?: string } = { nickName };

  if (password) {
    payload.password = password;
  }

  return axiosInstance.patch('/personal-info', payload);
};

// API 호출 코드
export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('profileImage', file);

  try {
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
  } catch (error) {
    throw new Error('Failed to upload profile image');
  }
};

//pr태그 수정
export const updatePRTags = (tags: string[]) => {
  const formData = new FormData();

  // tags 배열의 각 태그를 'prTags'라는 필드 이름으로 FormData에 추가
  tags.forEach(tag => formData.append('prTags', tag));

  // axiosInstance를 사용해 FormData를 서버로 PATCH 요청
  return axiosInstance.patch('/personal-info/prTags', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // FormData 전송을 위한 헤더 설정
    },
  });
};

// 개인 정보 조회를 위한 API 요청
export const getNotification = () => {
  return axiosInstance.get('/user-notification/list');
};

// 알림설정 수정 api 요청
export const patchNotification = (msgType: string, agree: boolean) => {
  return axiosInstance.patch('/user-notification', {
    messageType: msgType,
    isAgreed: agree,
  });
};

// 푸쉬알림동의 수정을위한 api
export const patchPushNotificationAgreement = (isAgreed: boolean) => {
  return axiosInstance.patch(
    `/user-terms-conditions/push?isAgreed=${isAgreed}`,
    {}
  );
};
