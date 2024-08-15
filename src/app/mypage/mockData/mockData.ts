// mockUserData.ts

import { UserData } from './mockDataType'; // 타입 정의 불러오기

// mockUserData.ts

// 사용자 데이터 객체
export const mockUserData: UserData = {
  // 사용자 기본 정보
  id: 'user123@example.com', // 유저 ID (이메일)
  nickname: 'JohnDoe', // 닉네임
  prTag: 'Fun-loving board gamer', // PR 태그
  profileImage: 'https://via.placeholder.com/150', // 프로필 이미지 URL
  averageRating: 4.5, // 평균 별점

  // 친구 목록
  friends: [
    {
      id: 'friend1', // 친구 ID
      nickname: 'Gamer1', // 친구 닉네임
      profileImage: 'https://via.placeholder.com/150', // 친구 프로필 이미지 URL
    },
    {
      id: 'friend2', // 친구 ID
      nickname: 'Gamer2', // 친구 닉네임
      profileImage: 'https://via.placeholder.com/150', // 친구 프로필 이미지 URL
    },
  ],

  // 모임 정보
  meetings: {
    // 현재 참여 중인 모임 목록
    activeMeetings: [
      {
        id: 'meeting1', // 모임 ID
        name: 'Saturday Board Game Night', // 모임 이름
        schedule: '2024-08-20 18:00', // 모임 일정
        location: 'Cafe ABC', // 모임 장소
      },
      {
        id: 'meeting2', // 모임 ID
        name: 'Strategy Game Marathon', // 모임 이름
        schedule: '2024-08-22 14:00', // 모임 일정
        location: 'Gaming Room XYZ', // 모임 장소
      },
    ],
    // 종료된 모임 목록
    endedMeetings: [
      {
        id: 'meeting3', // 모임 ID
        name: 'Weekend War Game Session', // 모임 이름
        schedule: '2024-08-01 15:00', // 모임 일정
        location: 'Game Hall 123', // 모임 장소
      },
    ],
    // 내가 만든 모임 목록
    myMeetings: [
      {
        id: 'meeting4', // 모임 ID
        name: 'Monthly RPG Campaign', // 모임 이름
        schedule: '2024-08-30 19:00', // 모임 일정
        location: 'Board Game Cafe', // 모임 장소
      },
    ],
  },

  // 알림 설정
  notifications: {
    meetingReminder: true, // 모임 리마인더 알림 설정
    newFriendRequest: true, // 새로운 친구 요청 알림 설정
    reviewReceived: true, // 리뷰 수신 알림 설정
    newMeetingCreated: false, // 새로운 모임 생성 알림 설정
    meetingDeleted: true, // 모임 삭제 알림 설정
  },

  // 리뷰 정보
  reviews: {
    // 내가 작성한 리뷰 목록
    writtenReviews: [
      {
        meetingName: 'Weekend War Game Session', // 리뷰 대상 모임 이름
        tags: ['#공정해요', '#재미있어요'], // 평가 태그
        rating: 5, // 별점
      },
    ],
    // 내가 받은 리뷰 목록
    receivedReviews: [
      {
        meetingName: 'Strategy Game Marathon', // 리뷰 대상 모임 이름
        tags: ['#매너가 좋아요', '#다시 만나고싶어요!'], // 평가 태그
        rating: 4, // 별점
      },
    ],
  },

  // 찜한 모임 목록
  favoriteMeetings: [
    {
      id: 'meeting5', // 모임 ID
      name: 'Casual Game Night', // 모임 이름
      schedule: '2024-08-25 18:00', // 모임 일정
      location: 'Cafe 456', // 모임 장소
    },
  ],
};
