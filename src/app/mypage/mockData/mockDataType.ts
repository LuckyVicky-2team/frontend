// types.ts

// 사용자 프로필 타입 정의
export interface UserProfile {
  id: string; // 사용자 ID (이메일)
  nickname: string; // 닉네임
  prTag: string; // PR 태그
  profileImage: string; // 프로필 이미지 URL
  averageRating: number; // 평균 별점
}

// 친구 타입 정의
export interface Friend {
  id: string; // 친구 ID
  nickname: string; // 친구 닉네임
  profileImage: string; // 친구 프로필 이미지 URL
}

// 모임 타입 정의
export interface Meeting {
  id: string; // 모임 ID
  name: string; // 모임 이름
  schedule: string; // 모임 일정
  location: string; // 모임 장소
}

// 모임 리스트 타입 정의
export interface MeetingList {
  activeMeetings: Meeting[]; // 현재 참여 중인 모임 목록
  endedMeetings: Meeting[]; // 종료된 모임 목록
  myMeetings: Meeting[]; // 내가 만든 모임 목록
}

// 알림 설정 타입 정의
export interface Notifications {
  meetingReminder: boolean; // 모임 리마인더 알림 설정
  newFriendRequest: boolean; // 새로운 친구 요청 알림 설정
  reviewReceived: boolean; // 리뷰 수신 알림 설정
  newMeetingCreated: boolean; // 새로운 모임 생성 알림 설정
  meetingDeleted: boolean; // 모임 삭제 알림 설정
}

// 리뷰 타입 정의
export interface Review {
  meetingName: string; // 리뷰 대상 모임 이름
  tags: string[]; // 평가 태그
  rating: number; // 별점
}

// 리뷰 리스트 타입 정의
export interface ReviewList {
  writtenReviews: Review[]; // 내가 작성한 리뷰 목록
  receivedReviews: Review[]; // 내가 받은 리뷰 목록
}

// 사용자 전체 데이터 타입 정의
export interface UserData {
  id: string; // 사용자 ID
  nickname: string; // 닉네임
  prTag: string; // PR 태그
  profileImage: string; // 프로필 이미지 URL
  averageRating: number; // 평균 별점
  friends: Friend[]; // 친구 목록
  meetings: MeetingList; // 모임 정보
  notifications: Notifications; // 알림 설정
  reviews: ReviewList; // 리뷰 정보
  favoriteMeetings: Meeting[]; // 찜한 모임 목록
}

//@haewon review type
interface ReviewedUser {
  reviewId: number; // 리뷰를 받은 사용자의 ID
  revieweeName: string; // 리뷰를 받은 사용자의 이름
  rating: number; // 별점
  positiveTags: string[]; // 긍정 리뷰 태그 목록
  negativeTags: string[]; // 부정 리뷰 태그 목록
}

// 모임 정보와 그 모임에서 작성된 리뷰 타입 정의
export interface IMeetingReviewProps {
  item: {
    id: number; // 모임의 고유 ID
    title: string; // 모임의 제목
    thumbnail: string; // 모임 썸네일 이미지 URL
    city: string;
    county: string;
    gatheringDate: string;
    reviewee: ReviewedUser[]; // 모임에서 리뷰를 받은 사용자 목록
  };
}

interface Manner {
  count: number;
  tagPhrase: string;
}

export interface IReceivedReviewItemProps {
  positiveTags: Manner[];
  negativeTags: Manner[];
}

export interface IAttendGatheringItemProps {
  id: number;
  title: string;
  thumbnail: string;
  city: string;
  county: string;
  gatheringDate: string;
  participants: any[];
}
