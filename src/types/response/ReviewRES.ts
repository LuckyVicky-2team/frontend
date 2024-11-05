interface ITagProps {
  evaluationTagId: number;
  tagPhrase: string;
  evaluationType: 'POSITIVE' | 'NEGATIVE';
}
export interface IEvaluationTagsResponseProps {
  positiveTags: ITagProps[];
  negativeTags: ITagProps[];
}

export interface ISingleMeetingResponseProps {
  meetingId: number;
  meetingDate: string;
  title: string;
  thumbnail: string;
  city: string;
  county: string;
}

//내가 쓴 리뷰
export interface ISingleMyReviewResponseProps {
  reviewId: number;
  revieweeName: string;
  rating: number;
  positiveTags: string[];
  negativeTags: string[];
}

//내가 받은 리뷰
interface IEvaluationProps {
  count: number;
  tagPhrase: string;
}

export interface IReceivedReviewResponseProps {
  averageRating: number;
  positiveTags: IEvaluationProps[];
  negativeTags: IEvaluationProps[];
}
