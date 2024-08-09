export interface IParticipant {
  userId: number;
  profileImage: string;
}
export interface IGatheringDetailsResponse {
  title: string;
  image: string;
  content: string;
  address: string;
  addressDetail: string;
  place: string;
  map: string;
  isZzimed: boolean;
  master: string;
  participants: IParticipant[];
  game: string;
  genre: string;
}
