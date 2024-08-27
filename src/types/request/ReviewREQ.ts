export interface IReviewMutationReqeustProps {
  revieweeId: number;
  meetingId: number;
  rating: number;
  evaluationTagList: number[];
}
export interface IReviewMeetingList {
  reviewType: 'PRE_PROGRESS' | 'FINISH';
}
