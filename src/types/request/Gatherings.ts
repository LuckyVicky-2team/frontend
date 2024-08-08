export interface INewGatheringFormValuesRequest {
  image: File | '';
  title: string;
  tags: string;
  content: string;
  contentWithoutHtml: string; //content 유효성 검사를 하기 위한 값
  city: string; //시
  country: string; //구
  location: { lat: number; lon: number }; //위도 경도
  gatheringDate: Date; //만나는 날짜 === 마감일
  boardGameIdList: number[];
  participants: number;
  type: 'free' | 'accept';
}
