export interface IReviewMutationReqeustProps {
  revieweeId: number;
  meetingId: number;
  rating: number;
  evaluationTagList: number[];
}
export interface IReviewMeetingListRequestProps {
  reviewType: 'PRE_PROGRESS' | 'FINISH';
}

export interface IRevieweeListRequestProps {
  meetingId: number;
}

export interface IMyReviewListRequestProps {
  meetingId: number;
}
