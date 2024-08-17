export interface IParticipant {
  userId: number;
  profileImage: string;
  nickname: string;
  type: string;
}

export interface IBoardGame {
  boardGameId: number;
  title: string;
  thumbnail: string;
}

export interface IGatheringDetailsResponseProps {
  mettingId: number;
  userNickName: string;
  meetingDateTime: Date;
  title: string;
  content: string;
  longitude: number;
  latitude: number;
  city: string;
  county: string;
  limitParticipant: 9;
  state: string;
  genres: string[];
  totalParticipantCount: number;
  userParticipantResponseList: IParticipant[];
  boardGameListResponseList: IBoardGame[];

  // image: string;
  // addressDetail: string;
  // place: string;
  // isZzimed: boolean;
}
