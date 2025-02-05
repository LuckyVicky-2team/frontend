'use client';

import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
import ToBottomButton from '../ToBottomButton';
import Spinner from '@/components/common/Spinner';
import styles from './ChattingRoom.module.scss';

interface IChattingRoomProps {
  chatRoomId: number;
  gatheringId: number;
}

export default function ChattingRoom({
  chatRoomId,
  gatheringId,
}: IChattingRoomProps) {
  const { addToast } = useToast();

  const router = useRouter();

  const stompClient = useRef<StompJs.Client>();
  const talkListItemRef = useRef<HTMLDivElement>(null);
  const { ref: firstMessageRef, inView: firstMessageView } = useInView();
  const { ref: lastMessageRef, inView: lastMessageView } = useInView({
    initialInView: true,
  });

  const [message, setMessage] = useState(''); // 전송할 메시지
  const [messages, setMessages] = useState<IChattingsContent[]>([]); // 수신한 메시지 목록
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isMyMessage, setIsMyMessage] = useState(false);

  const { data: gatheringData } = useGetGatheringInfo(gatheringId);
  const { data: userData, isError: isUserError } = useGetMyInfo(gatheringData);
  const {
    data: chattingLog,
    fetchNextPage,
    isPending: isChattingPending,
    isError: isChattingError,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useGetChattingLog(chatRoomId);

  const gatheringMembers = gatheringData?.userParticipantResponseList;

  const userId = gatheringMembers?.find(
    (member: IParticipant) => member?.nickname === userData?.nickName
  )?.userId;

  // 채팅방 연결 시
  const onConnected = () => {
    if (!stompClient.current) return;

    stompClient.current.subscribe(`/topic/chat/${chatRoomId}`, message => {
      const messageData = JSON.parse(message.body);
      setMessages(prevMessages => [...prevMessages, messageData]);

      if (+messageData.userId === userId) {
        setIsMyMessage(true);
      }
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
    if (!message.trim()) {
      return;
    }

    if (stompClient.current && userData && chattingLog) {
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

  // 메시지 전송 키보드 이벤트 핸들러
  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 최근 메시지 보기 버튼 마우스 이벤트 핸들러
  const handleClickBottomButton = () => {
    if (!talkListItemRef.current) return;
    talkListItemRef.current.scrollTop = talkListItemRef.current.scrollHeight;
  };

  // 채팅방 멤버에 속하지 않거나 유저 정보를 불러올 수 없는 경우 리다이렉트
  useEffect(() => {
    if (isUserError) {
      addToast('유저 정보를 불러올 수 없습니다.', 'error');
      return router.replace('/main');
    }

    if (!userData) return;

    if (!userId) {
      addToast('잘못된 접근입니다.', 'error');
      return router.replace('/main');
    }
  }, [userData, isUserError]);

  // 채팅 로그 불러오기 오류 시 채팅 서버 연결 해제
  useEffect(() => {
    if (isChattingError && stompClient.current) {
      stompClient.current.deactivate();
    }
  }, [isChattingError]);

  // 채팅방 서버와 연결
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

  // 채팅 메시지들 업데이트 및 스크롤 제어
  useEffect(() => {
    if (!chattingLog || !talkListItemRef.current) return;

    const previousScrollHeight = talkListItemRef.current.scrollHeight;

    const newMessages = chattingLog.pages[chattingLog.pages.length - 1].content;

    if (!newMessages) return;

    newMessages.reverse();

    setMessages(prevMessages => [...newMessages, ...prevMessages]);

    setTimeout(() => {
      if (talkListItemRef.current) {
        const currentScrollHeight = talkListItemRef.current.scrollHeight;
        talkListItemRef.current.scrollTop +=
          currentScrollHeight - previousScrollHeight;
      }
    }, 0);
  }, [chattingLog]);

  // 스크롤 제어
  useEffect(() => {
    if (!talkListItemRef.current) return;

    // 첫 렌더링 시 맨 아래로 스크롤 위치
    if (isFirstRender && messages.length) {
      talkListItemRef.current.scrollTop = talkListItemRef.current.scrollHeight;
      setIsFirstRender(false);
      return;
    }

    // 맨 아래 메시지가 보일 때는 스크롤 부드럽게 조절
    if (lastMessageView) {
      talkListItemRef.current.scrollTo({
        top: talkListItemRef.current.scrollHeight,
        behavior: 'smooth',
      });
      return;
    }

    // 내 메시지 전송 후 스크롤 내리기
    if (isMyMessage) {
      talkListItemRef.current.scrollTop = talkListItemRef.current.scrollHeight;
      setIsMyMessage(false);
      return;
    }
  }, [messages]);

  // 이전 메시지 더 불러오기
  useEffect(() => {
    if (firstMessageView) {
      fetchNextPage();
    }
  }, [firstMessageView]);

  // 키보드 생길 시 body 높이 조절
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < document.documentElement.clientHeight) {
        document.body.style.height = `${window.innerHeight}px`;
      } else {
        document.body.style.height = '100%';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.chattingRoom}>
      <GatheringInfoOfThread
        thumbnail={gatheringData.thumbnail}
        title={gatheringData.title}
        place={`${gatheringData.city} ${gatheringData.county}`}
        meetingId={gatheringData.meetingId}
        participants={gatheringData.userParticipantResponseList}
        state={gatheringData.state}
        userId={userId}
        className={styles.gatheringData}
      />
      <div className={styles.outerTalksContainer}>
        <div className={styles.talksContainer} ref={talkListItemRef}>
          {isChattingPending ? (
            <div className={styles.logExcept}>
              <Spinner />
            </div>
          ) : isChattingError ? (
            <div className={styles.logExcept}>채팅을 불러올 수 없습니다.</div>
          ) : chattingLog.pages[0].status === 204 && messages.length === 0 ? (
            <div className={styles.logExcept}>
              아직 대화가 없습니다. 첫 메시지를 남겨보세요!
            </div>
          ) : (
            <div className={styles.talks}>
              {messages.length !== 1 && isFetchingNextPage ? (
                <div className={styles.logExcept}>
                  <Spinner />
                </div>
              ) : (
                isFetchNextPageError && (
                  <div className={styles.logExcept}>
                    이전 채팅을 불러올 수 없습니다.
                  </div>
                )
              )}
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
          )}
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
