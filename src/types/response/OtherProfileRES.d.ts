export interface IOtherProfileResponse {
  nickName: string;
  profileImage: string;
  averageRating: number;
  prTags: string[];
  meetingCount: number;
}

export interface IEvalueationTag {
  evaluationTagId: number;
  tagPhrase: string;
  evaluationType: 'POSITIVE' | 'NEGATIVE';
  count: number;
}

export interface IOtherEvaluationTagsResponse {
  positiveTags: IEvalueationTag[];
  negativeTags: IEvalueationTag[];
}
