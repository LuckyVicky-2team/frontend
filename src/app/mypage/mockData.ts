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

//@haewon review item data
export const gatheringList: any[] = [
  {
    id: 1,
    title: '안녕하세요~ 2명 구합니다',
    imageUrl: '',
    location: '서울시 동작구',
    gatheringDate: '2023.08.07 19:00',
    content: '',
    participantCount: 2,
    capacity: 4,
    participants: [
      {
        userId: 'user_5678',
        userName: 'Alice',
      },
      {
        userId: 'user_91011',
        userName: 'Bob',
      },
    ],
  },
  {
    id: 2,
    title: '파티게임류 좋아하시는분만',
    imageUrl: '',
    location: '서울시 구로구',
    gatheringDate: '2024.04.05 13:00',
    participantCount: 3,
    capacity: 3,
    content: '1 contents',
    participants: [
      {
        userId: 'user_5678',
        userName: 'Alice',
      },
      {
        userId: 'user_91011',
        userName: 'Bob',
      },
    ],
  },
  {
    id: 3,
    title: '보드게임러 모여라',
    imageUrl: '',
    location: '인천시 연수구',
    gatheringDate: '2024.07.10 20:00',
    participantCount: 7,
    capacity: 7,
    content: '2 contents',
    participants: [
      {
        userId: 'user_5678',
        userName: 'Alice',
      },
      {
        userId: 'user_91011',
        userName: 'Bob',
      },
    ],
  },
];

export const writtenReviewList: any[] = [
  {
    id: 'meeting_001',
    title: 'Python Study Group',
    thumbnail: '',
    content:
      'while serializing webpack/lib/cache/PackFileCacheStrategy PackContentItems -> ',
    gatheringDate: '2023.08.07 19:00',
    reviewedUsers: [
      {
        userId: 'user_5678',
        userName: 'Alice',
        rating: 4.5,
        tags: ['#지식이풍부해요', '#친절해요'],
      },
      {
        userId: 'user_91011',
        userName: 'Bob',
        rating: 4.0,
        tags: ['#재미있어요', '#공정하지 못해요'],
      },
    ],
  },
  {
    id: 'meeting_002',
    title: 'React Developer Meetup',
    thumbnail: '',
    content: 'compiled in 194ms',
    gatheringDate: '2023.08.07 19:00',
    reviewedUsers: [
      {
        userId: 'user_1213',
        userName: 'Charlie',
        rating: 5.0,
        tags: [
          '#보드게임의 신',
          '#시간 약속을 잘 지켜요',
          '#재미있어요',
          '#다시 만나고싶어요!',
        ],
      },
    ],
  },
  {
    id: 'meeting_003',
    title: 'Data Science Workshop',
    thumbnail: '',
    content: '하하오오',
    gatheringDate: '2023.08.07 19:00',
    reviewedUsers: [
      {
        userId: 'user_1415',
        userName: 'Dave',
        rating: 3.5,
        tags: [
          '#재미있어요',
          '#보드게임의 신',
          '#시간을 안지켜요',
          '#다시 만나고싶어요!',
          '#공정하지 못해요',
          '#재미있어요',
          '#보드게임의 신',
          '#시간을 안지켜요',
          '#다시 만나고싶어요!',
        ],
      },
      {
        userId: 'user_1617',
        userName: 'Eve',
        rating: 4.8,
        tags: ['#의도가 부적절해요', '#시간을 안지켜요'],
      },
    ],
  },
  {
    id: 'meeting_004',
    title: 'Python Study Group',
    thumbnail: '',
    content:
      'while serializing webpack/lib/cache/PackFileCacheStrategy PackContentItems -> ',
    gatheringDate: '2023.08.07 19:00',
    reviewedUsers: [
      {
        userId: 'user_5678',
        userName: 'Alice',
        rating: 4.5,
        tags: ['#지식이풍부해요', '#친절해요'],
      },
      {
        userId: 'user_91011',
        userName: 'Bob',
        rating: 4.0,
        tags: ['#재미있어요', '#공정하지 못해요'],
      },
    ],
  },
  {
    id: 'meeting_005',
    title: 'Python Study Group',
    thumbnail: '',
    content:
      'while serializing webpack/lib/cache/PackFileCacheStrategy PackContentItems -> ',
    gatheringDate: '2023.08.07 19:00',
    reviewedUsers: [
      {
        userId: 'user_5678',
        userName: 'Alice',
        rating: 4.5,
        tags: ['#지식이풍부해요', '#친절해요'],
      },
      {
        userId: 'user_91011',
        userName: 'Bob',
        rating: 4.0,
        tags: ['#재미있어요', '#공정하지 못해요'],
      },
    ],
  },
];

export const receivedReviewList: any = {
  goodMannersList: [
    { id: 1, content: '친절하고 매너가 좋아요', count: 56 },
    { id: 2, content: '재미있어요', count: 54 },
    { id: 3, content: '시간 약속을 잘 지켜요', count: 53 },
    { id: 4, content: '공정해요', count: 32 },
    { id: 5, content: '보드게임의 신', count: 27 },
    { id: 6, content: '다시 만나고싶어요!', count: 27 },
  ],
  badMannersList: [
    { id: 7, content: '비매너 플레이어', count: 18 },
    { id: 8, content: '시간을 안지켜요', count: 5 },
    { id: 9, content: '의도가 부적절해요', count: 0 },
    { id: 10, content: '공정하지 못해요', count: 3 },
    { id: 11, content: '다시 만나기 싫어요!', count: 0 },
  ],
};

// {gatheringID : ['id1','id2],
//    gatheringDrafts: {
//        'id1':[{userId:'user1',rating:4, mannerIds:[1,3,5]}],
//        'id2':[{userId:'user2',rating:2,mannerIds:[2,4,6]}]
//      }
//  }
