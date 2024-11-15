'use client';

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { IErrorProps } from '@/types/CommonInterface';
import ThreadInput from '../ThreadInput';
import { IChattingsContent } from '@/types/response/ChatroomsRES';
import {
  useGetChattingLog,
  useGetGatheringInfo,
  useGetMyInfo,
} from '@/api/queryHooks/thread';
import { IParticipant } from '@/types/response/Gathering';
import TalkListItem from '../TalkListItem';
import styles from './ChattingRoom.module.scss';

interface IChattingRoomProps {
  chatRoomId: number;
  gatheringId: number;
}

export default function ChattingRoom({
  chatRoomId,
  gatheringId,
}: IChattingRoomProps) {
  const stompClient = useRef<StompJs.Client>();
  // const [connected, setConnected] = useState(false); // 연결 상태
  const [message, setMessage] = useState(''); // 전송할 메시지
  const [messages, setMessages] = useState<IChattingsContent[]>([]); // 수신한 메시지 목록

  const { data: gatheringData } = useGetGatheringInfo(gatheringId);
  const { data: userData } = useGetMyInfo(gatheringData);
  const { data: chattingLog } = useGetChattingLog(chatRoomId, 0);

  const gatheringMembers = gatheringData?.userParticipantResponseList;

  const onConnected = () => {
    // setConnected(true);

    if (!stompClient.current) return;

    stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, message => {
      const messageData = JSON.parse(message.body);
      setMessages(prevMessages => [...prevMessages, messageData]);
    });
  };

  // 에러 발생 시
  const onError = (frame: StompJs.IFrame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
  };

  // 웹소켓 에러 발생 시
  const onWebSocketError = (error: IErrorProps) => {
    console.error('WebSocket error: ', error);
  };

  // 메시지 전송
  const sendMessage = () => {
    // 빈 메시지는 전송하지 않음
    if (!message.trim()) {
      return;
    }

    if (stompClient.current && userData) {
      const userId = gatheringMembers.find(
        (member: IParticipant) => member.nickname === userData.nickName
      )?.userId;

      const chatRequest = {
        roomId: chatRoomId,
        content: message,
        senderId: userId,
        sendDatetime: new Date().toISOString(),
      };

      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(chatRequest),
      });

      setMessage(''); // 메시지 전송 후 입력 필드 초기화
    }
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    if (!userData) return;

    const stompClientValue = new StompJs.Client({
      brokerURL: 'https://chat.board-go.net/gs-guide-websocket',
      reconnectDelay: 2000, // 연결 끊김 시 재연결 시도
      onConnect: onConnected,
      onStompError: onError,
      onWebSocketError: onWebSocketError,
    });

    stompClient.current = stompClientValue;

    stompClientValue.activate();

    // 컴포넌트가 언마운트될 때 웹소켓 연결 해제
    return () => {
      stompClientValue.deactivate();
    };
  }, [userData]);

  useEffect(() => {
    if (!chattingLog) return;

    const messageArray = chattingLog.content.reverse();

    setMessages(messageArray);
  }, [chattingLog]);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight });
  }, [messages]);

  return (
    <div className={styles.chattingRoom}>
      {/* <GatheringInfoOfThread
        thumbnail={gatheringInfo.thumbnail}
        title={gatheringInfo.title}
        description={gatheringInfo.content}
        place={`${gatheringInfo.city} ${gatheringInfo.county}`}
        meetingId={gatheringInfo.meetingId}
        participants={gatheringInfo.userParticipantResponseList}
        className={styles.gatheringInfo}
      /> */}
      <div className={styles.talksContainer}>
        <div className={styles.talks}>
          {messages.map(message => {
            return (
              <TalkListItem
                key={message.sendDatetime}
                item={message}
                participants={gatheringMembers}
                userId={
                  gatheringMembers.find(
                    (member: IParticipant) =>
                      member?.nickname === userData?.nickName
                  )?.userId
                }
              />
            );
          })}
        </div>
      </div>
      <div className={styles.submit}>
        <ThreadInput
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyUp={handlePressEnter}
          onClick={() => sendMessage()}
        />
      </div>
    </div>
  );
}
