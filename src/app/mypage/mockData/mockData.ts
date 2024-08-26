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
    id: 1004,
    title: '안녕하세요~ 2명 구합니다',
    imageUrl: '',
    city: '서울특별시',
    county: '도봉구',
    gatheringDate: '2023:08:07T19:00:000.0000',
    participants: [
      {
        userId: 5678111,
        userName: '이예진',
      },
      {
        userId: 91011112,
        userName: '양지원',
      },
      {
        userId: 567877831,
        userName: '조효은',
      },
      {
        userId: 910109142,
        userName: '김수환',
      },
      {
        userId: 91011953,
        userName: '이예진',
      },
      {
        userId: 567123816,
        userName: '진찬용1',
      },
      {
        userId: 910177717,
        userName: '기송은1',
      },
      {
        userId: 5671238128,
        userName: '조효은1',
      },
      {
        userId: 910177729,
        userName: '기송은2',
      },
      {
        userId: 56712383100,
        userName: '진찬용3',
      },
      {
        userId: 910177732111,
        userName: '조효은2',
      },
      {
        userId: 91017774122,
        userName: '기송은4',
      },
    ],
  },
  {
    id: 2004,
    title: '파티게임류 좋아하시는분만',
    imageUrl: '',
    city: '서울특별시',
    county: '성북구',
    gatheringDate: '2024:04:05T13:00:000.0000',
    participants: [
      {
        userId: 56787783,
        userName: '조효은',
      },
      {
        userId: 91010914,
        userName: '김수환',
      },
      {
        userId: 9101195,
        userName: '이예진',
      },
    ],
  },
  {
    id: 3004,
    title: '보드게임러 모여라',
    imageUrl: '',
    city: '인천광역시',
    county: '계양구',
    gatheringDate: '2024:07:10T20:00:000.0000',
    participants: [
      {
        userId: 567123816,
        userName: '진찬용1',
      },
      {
        userId: 910177717,
        userName: '기송은1',
      },
      {
        userId: 5671238128,
        userName: '조효은1',
      },
      {
        userId: 910177729,
        userName: '기송은2',
      },
      {
        userId: 5671238310,
        userName: '진찬용3',
      },
      {
        userId: 91017773211,
        userName: '조효은2',
      },
      {
        userId: 9101777412,
        userName: '기송은4',
      },
    ],
  },
];

export const writtenReviewList: any[] = [
  {
    id: 9876,
    title: 'Python Study Group',
    thumbnail: '',
    content:
      'while serializing webpack/lib/cache/PackFileCacheStrategy PackContentItems -> ',
    gatheringDate: '2023:08:07T19:00',
    reviewedUsers: [
      {
        userId: 5678113,
        userName: '이해원1',
        rating: 4.5,
        positiveTags: ['#지식이풍부해요', '#친절해요'],
        negativeTags: [],
      },
      {
        userId: 91011214,
        userName: '이해원2',
        rating: 4.0,
        positiveTags: ['#재미있어요'],
        negativeTags: ['#공정하지 못해요'],
      },
    ],
  },
  {
    id: 5432,
    title: 'React Developer Meetup',
    thumbnail: '',
    content: 'compiled in 194ms',
    gatheringDate: '2023:08L07T19:00',
    reviewedUsers: [
      {
        userId: 1213315,
        userName: '이해원3',
        rating: 5.0,
        positiveTags: [
          '#보드게임의 신',
          '#시간 약속을 잘 지켜요',
          '#재미있어요',
          '#다시 만나고싶어요!',
        ],
        negativeTags: [],
      },
    ],
  },
  {
    id: 1098,
    title: 'Data Science Workshop',
    thumbnail: '',
    content: '하하오오',
    gatheringDate: '2023:08:07T19:00',
    reviewedUsers: [
      {
        userId: 1415416,
        userName: '이해원4',
        rating: 3.5,
        positiveTags: ['#재미있어요', '#보드게임의 신', '#다시 만나고싶어요!'],
        negativeTags: ['#시간을 안지켜요', '#공정하지 못해요'],
      },
      {
        userId: 1617517,
        userName: '이해원5',
        rating: 4.8,
        positiveTags: [],
        negativeTags: ['#의도가 부적절해요', '#시간을 안지켜요'],
      },
    ],
  },
  {
    id: 7777,
    title: 'Python Study Group',
    thumbnail: '',
    content:
      'while serializing webpack/lib/cache/PackFileCacheStrategy PackContentItems -> ',
    gatheringDate: '2023:08:07T19:00',
    reviewedUsers: [
      {
        userId: 5678618,
        userName: '이해원6',
        rating: 4.5,
        positiveTags: ['#지식이풍부해요', '#친절해요'],
        negativeTags: [],
      },
      {
        userId: 91011719,
        userName: '이해원7',
        rating: 4.0,
        positiveTags: ['#재미있어요'],
        negativeTags: ['#공정하지 못해요'],
      },
    ],
  },
  {
    id: 6666,
    title: 'Python Study Group',
    thumbnail: '',
    content:
      'while serializing webpack/lib/cache/PackFileCacheStrategy PackContentItems -> ',
    gatheringDate: '2024:07:31T17:55',
    reviewedUsers: [
      {
        userId: 5678820,
        userName: '이해원8',
        rating: 4.5,
        positiveTags: ['#지식이풍부해요', '#친절해요'],
        negativeTags: [],
      },
      {
        userId: 91011921,
        userName: '이해원9',
        rating: 4.0,
        positiveTags: ['#재미있어요'],
        negativeTags: ['#공정하지 못해요'],
      },
    ],
  },
];

export const receivedReviewList: any = {
  averageRating: 4.6,
  positiveTags: [
    { tagPhrase: '친절하고 매너가 좋아요', count: 56 },
    { tagPhrase: '재미있어요', count: 54 },
    { tagPhrase: '시간 약속을 잘 지켜요', count: 2 },
    // { tagPhrase: '공정해요', count: 321 },
    // { tagPhrase: '보드게임의 신', count: 27 },
    { tagPhrase: '다시 만나고싶어요!', count: 27 },
  ],
  negativeTags: [
    { tagPhrase: '비매너 플레이어', count: 18 },
    { tagPhrase: '시간을 안지켜요', count: 5 },
    { tagPhrase: '의도가 부적절해요', count: 0 },
    // { tagPhrase: '공정하지 못해요', count: 3 },
    // { tagPhrase: '다시 만나기 싫어요!', count: 0 },
    { tagPhrase: '다시 만나기 싫어요!', count: 100 },
  ],
};

// {gatheringID : ['id1','id2],
//    gatheringDrafts: {
//        'id1':[{userId:'user1',rating:4, mannerIds:[1,3,5]}],
//        'id2':[{userId:'user2',rating:2,mannerIds:[2,4,6]}]
//      }
//  }
