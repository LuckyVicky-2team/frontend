export interface IGatheringListResponseProps {
  content: {
    id: number;
    title: string;
    city: string;
    county: string;
    meetingDate: string;
    limitParticipant: number;
    nickName: string;
    games: string[];
    tags: string[];
    participantCount: number;
    thumbnail: string;
  }[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}
