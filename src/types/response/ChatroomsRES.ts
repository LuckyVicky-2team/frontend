export interface IChatroomResponse {
  chatRoomId: number | null;
  lastMessage: string | null;
  lastSendDateTime: string | null;
  meetingId: number;
  meetingTitle: string;
  thumbnail: string | null;
}
