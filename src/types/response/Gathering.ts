export interface IGenre {
  id: number;
  title: string;
}

export interface IGame {
  id: number;
  title: string;
  thumbnail: string;
  genres: IGenre[];
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: number;
  unpaged: number;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IGameData {
  content: IGame[];
  pageable: IPageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: ISort;
  numberOfElements: number;
  empty: boolean;
}

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
  meetingId: number;
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
  viewCount: number;
}
