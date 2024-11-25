'use client';

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import ThreadInput from '../ThreadInput';
import { IChattingsContent } from '@/types/response/ChatroomsRES';
import {
  useGetChattingLog,
  useGetGatheringInfo,
  useGetMyInfo,
} from '@/api/queryHooks/thread';
import { IParticipant } from '@/types/response/Gathering';
import TalkListItem from '../TalkListItem';
import GatheringInfoOfThread from '../GatheringInfoOfThread';
import { useInView } from 'react-intersection-observer';
import { useToast } from '@/contexts/toastContext';
import styles from './ChattingRoom.module.scss';
import ToBottomButton from '../ToBottomButton';

interface IChattingRoomProps {
  chatRoomId: number;
  gatheringId: number;
}

export default function ChattingRoom({
  chatRoomId,
  gatheringId,
}: IChattingRoomProps) {
  const { addToast } = useToast();

  const stompClient = useRef<StompJs.Client>();
  const talkListItemRef = useRef<HTMLDivElement>(null);
  const { ref: firstMessageRef, inView: firstMessageView } = useInView();
  const { ref: lastMessageRef, inView: lastMessageView } = useInView({
    initialInView: true,
  });

  const [message, setMessage] = useState(''); // 전송할 메시지
  const [messages, setMessages] = useState<IChattingsContent[]>([]); // 수신한 메시지 목록
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { data: gatheringData } = useGetGatheringInfo(gatheringId);
  const { data: userData } = useGetMyInfo(gatheringData);
  const { data: chattingLog, fetchNextPage } = useGetChattingLog(chatRoomId);

  const gatheringMembers = gatheringData?.userParticipantResponseList;
  const userId = gatheringMembers?.find(
    (member: IParticipant) => member?.nickname === userData?.nickName
  )?.userId;

  const onConnected = () => {
    if (!stompClient.current) return;

    stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, message => {
      const messageData = JSON.parse(message.body);
      setMessages(prevMessages => [...prevMessages, messageData]);
    });
  };

  // 에러 발생 시
  const onError = () => {
    addToast('채팅방에 연결하는데 문제가 발생했습니다.', 'error');
  };

  // 웹소켓 에러 발생 시
  const onWebSocketError = () => {
    addToast('채팅방에 연결하는데 문제가 발생했습니다.', 'error');
  };

  // 메시지 전송
  const sendMessage = () => {
    // 빈 메시지는 전송하지 않음
    if (!message.trim()) {
      return;
    }

    if (stompClient.current && userData) {
      const chatRequest = {
        roomId: chatRoomId,
        content: message,
        senderId: userId,
        sendDatetime: new Date().toISOString(),
      };

      try {
        stompClient.current.publish({
          destination: '/app/chat.sendMessage',
          body: JSON.stringify(chatRequest),
        });

        setMessage('');
      } catch {
        addToast('메시지를 보내는데 실패했습니다.', 'error');
      }
    }
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleClickBottomButton = () => {
    if (!talkListItemRef.current) return;
    talkListItemRef.current.scrollTop = talkListItemRef.current.scrollHeight;
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

    const newMessages = chattingLog.pages[chattingLog.pages.length - 1].content;

    if (!newMessages) return;

    newMessages.reverse();

    setMessages([...newMessages, ...messages]);
  }, [chattingLog]);

  useEffect(() => {
    if (talkListItemRef.current) {
      if (isFirstRender && messages.length) {
        talkListItemRef.current.scrollTop =
          talkListItemRef.current.scrollHeight;
      } else if (lastMessageView) {
        talkListItemRef.current.scrollTo({
          top: talkListItemRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }

      if (isFirstRender && messages.length) {
        setIsFirstRender(false);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (firstMessageView) {
      fetchNextPage();
    }
  }, [firstMessageView]);

  return (
    <div className={styles.chattingRoom}>
      <GatheringInfoOfThread
        thumbnail={gatheringData.thumbnail}
        title={gatheringData.title}
        description={gatheringData.content}
        place={`${gatheringData.city} ${gatheringData.county}`}
        meetingId={gatheringData.meetingId}
        participants={gatheringData.userParticipantResponseList}
        state={gatheringData.state}
        userId={userId}
        className={styles.gatheringData}
      />
      <div className={styles.outerTalksContainer}>
        <div className={styles.talksContainer} ref={talkListItemRef}>
          <div className={styles.talks}>
            {messages.map((message, index) => {
              return (
                <TalkListItem
                  key={index}
                  item={message}
                  participants={gatheringMembers}
                  userId={userId}
                  ref={
                    index === 0
                      ? firstMessageRef
                      : index === messages.length - 1
                        ? lastMessageRef
                        : null
                  }
                />
              );
            })}
          </div>
        </div>
        <div
          className={`${styles.toBottomButton} ${!lastMessageView && styles.visible}`}>
          <ToBottomButton
            onClick={handleClickBottomButton}
            className={styles.button}
          />
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
