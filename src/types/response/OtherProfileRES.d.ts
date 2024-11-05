export interface IOtherProfileResponse {
  nickName: string;
  profileImage: string;
  averageRating: number;
  prTags: string[];
  meetingCount: number;
  positiveTags: IEvalueationTag[];
  negativeTags: IEvalueationTag[];
}

export interface IEvalueationTag {
  tagPhrase: string;
  count: number;
}

export interface IOtherProfileAPIError {
  errorCode: number;
  message: string;
}
