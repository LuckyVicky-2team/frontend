export interface IParticipant {
  userId: number;
  profileImage: string;
  nickname: string;
  type: 'LEADER' | 'PARTICIPANT' | 'NONE' | 'QUIT' | undefined;
}

export interface IBoardGame {
  boardGameId: number;
  title: string;
  thumbnail: string;
}

export interface IGatheringDetailsResponseProps {
  mettingId: number;
  userNickName: string;
  meetingDatetime: string;
  title: string;
  content: string;
  longitude: number;
  latitude: number;
  city: string;
  county: string;
  limitParticipant: 9;
  state: 'PROGRESS' | 'COMPLETE' | 'FINISH';
  genres: string[];
  totalParticipantCount: number;
  userParticipantResponseList: IParticipant[];
  boardGameListResponseList: IBoardGame[];
  thumbnail: string;
  detailAddress: string;
  locationName: string;
  shareCount: number;
  createMeetingCount: string;
  likeStatus: 'N' | 'Y';
}
