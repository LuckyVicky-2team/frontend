export interface INewGatheringFormValuesRequest {
  image: File | '';
  title: string;
  tags: string;
  content: string;
  contentWithoutHtml: string; //content 유효성 검사를 하기 위한 값
  city: string; //시
  country: string; //구
  latitude: string; //위도
  longitude: string; //경도
  meetingDatetime: Date; //만나는 날짜 === 마감일
  boardGameIdList: number[];
  genreIdList: number[];
  limitParticipant: number;
  type: 'FREE' | 'ACCEPT';
}
