export interface IChatroomResponse {
  chatRoomId: number | null;
  lastMessage: string | null;
  lastSendDateTime: string | null;
  meetingTitle: string;
  thumbnail: string | null;
}
