export interface IGatheringListRequestProps {
  count: number;
  tag?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  searchWord?: string;
  searchType?: 'TITLE' | 'CONTENT' | 'ALL' | '';
  city?: string;
  county?: string;
  page?: number;
  size?: number;
  sortBy?: 'MEETING_DATE' | 'PARTICIPANT_COUNT';
}

export interface IKickInfoProps {
  meetingId: number;
  meetingState: string;
  userId: number;
}
