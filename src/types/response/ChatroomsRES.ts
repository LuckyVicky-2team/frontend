export interface IChatroomsResponse {
  chatRoomId: number | null;
  lastMessage: string | null;
  lastSendDatetime: string | null;
  meetingId: number;
  meetingTitle: string;
  thumbnail: string | null;
}

export interface IChattingsContent {
  id?: string;
  content: string;
  roomId: number;
  sendDatetime: string;
  userId: number;
}

export interface IChattingsResponse {
  content: IChattingsContent[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}
