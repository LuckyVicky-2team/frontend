'use client';

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { IErrorProps } from '@/types/CommonInterface';
import ThreadInput from '../ThreadInput';
import styles from './ChattingRoom.module.scss';

interface IChattingRoomProps {
  chatRoomId: number;
}

export default function ChattingRoom({ chatRoomId }: IChattingRoomProps) {
  const stompClient = useRef<StompJs.Client>();
  const [connected, setConnected] = useState(false); // 연결 상태
  const [message, setMessage] = useState(''); // 전송할 메시지
  const [messages, setMessages] = useState<string[]>([]); // 수신한 메시지 목록

  console.log(connected);

  const onConnected = (frame: StompJs.IFrame) => {
    console.log('Connected: ' + frame);
    setConnected(true);

    if (!stompClient.current) return;

    stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, message => {
      const messageData = JSON.parse(message.body);
      setMessages(prevMessages => [...prevMessages, messageData.content]);
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

    if (stompClient.current) {
      const chatRequest = {
        roomId: chatRoomId,
        content: message,
        senderId: 46, // 사용자 ID
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
    const stompClientValue = new StompJs.Client({
      brokerURL: 'ws://43.200.143.133:8080/gs-guide-websocket',
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
  }, []);

  return (
    <>
      <div className={styles.talks}>
        {/* {talks.map(talk => {
          return <TalkListItem key={talk.id} item={talk} />;
        })} */}
        {messages.map((message, index) => {
          return <div key={index}>{message}</div>;
        })}
      </div>
      <div className={styles.submit}>
        <ThreadInput
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyUp={handlePressEnter}
          onClick={() => sendMessage()}
        />
      </div>
    </>
  );
}
