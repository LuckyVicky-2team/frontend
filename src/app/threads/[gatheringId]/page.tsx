'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
// import TalkListItem from '../_components/TalkListItem';
// import GatheringInfoOfThread from '../_components/GatheringInfoOfThread';
import ThreadInput from '../_components/ThreadInput';
import styles from './ThreadDetailPage.module.scss';

// const getTalks = async (_id: string) => {
//   const talks = [
//     {
//       id: 0,
//       nickname: '김수환',
//       contents: '언제 오는거야 대체?',
//       createdAt: '2024-08-05T12:27:15',
//       profileImage: '/assets/icons/default-profile.svg',
//     },
//     {
//       id: 1,
//       nickname: '이해원',
//       contents: '너무 늦긴 한다 좀',
//       createdAt: '2024-08-05T12:29:49',
//       profileImage: '/assets/icons/default-profile.svg',
//     },
//     {
//       id: 2,
//       nickname: '기송은',
//       contents: '찬용아 개념좀 챙기자 제발',
//       createdAt: '2024-08-05T12:34:10',
//       profileImage: '/assets/icons/default-profile.svg',
//     },
//     {
//       id: 3,
//       nickname: '진찬용',
//       contents: '배고파.. 오늘 점심 뭐 먹을래?',
//       createdAt: '2024-08-05T12:38:42',
//       profileImage: '/assets/icons/default-profile.svg',
//     },
//   ];

//   return talks;
// };

// const getGatheringInfo = async (_id: string) => {
//   const gatheringInfo = {
//     meetingId: 7,
//     userNickName: 'nickName8',
//     rating: 0.0,
//     meetingDatetime: '2024-09-20T04:45:32.643604',
//     likeStatus: 'N',
//     thumbnail: '/assets/images/emptyThumbnail.png',
//     title: '인원 모집 모임원 모집',
//     content: '보드게임 인원 보충 모집합니다 5명이용',
//     longitude: '8.787878',
//     latitude: '8.12321321',
//     city: '경기',
//     county: '부천시',
//     locationName: 'location8',
//     detailAddress: 'detailAddress8',
//     limitParticipant: 8,
//     state: 'PROGRESS',
//     shareCount: 0,
//     viewCount: 0,
//     createMeetingCount: 1,
//     genres: [
//       'genre7',
//       'genre8',
//       'genre5',
//       'genre6',
//       'genre3',
//       'genre4',
//       'genre1',
//       'genre2',
//       'genre0',
//     ],
//     totalParticipantCount: 2,
//     userParticipantResponseList: [
//       {
//         userId: 9,
//         profileImage: null,
//         nickname: 'picachu',
//         type: 'LEADER',
//       },
//       {
//         userId: 10,
//         profileImage: null,
//         nickname: '진찬용',
//         type: 'PARTICIPANT',
//       },
//     ],
//     boardGameListResponseList: [
//       {
//         boardGameId: 9,
//         title: 'boardTitle8',
//         thumbnail: 'thumbnail8',
//       },
//     ],
//   };

//   return gatheringInfo;
// };

export default function ThreadDetailPage({
  _params,
}: {
  _params: { gatheringId: string };
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  // const talks = await getTalks(params.gatheringId);

  // const gatheringInfo = await getGatheringInfo(params.gatheringId);

  useEffect(() => {
    // 웹소켓 연결은 클라이언트에서만 실행
    const ws = new WebSocket('ws://43.203.230.239:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('웹소켓 연결 성공');
    };

    ws.onmessage = event => {
      const receivedMessage = event.data;
      setMessages(prevMessages => [...prevMessages, receivedMessage]);
    };

    ws.onclose = () => {
      console.log('웹소켓 연결이 종료되었습니다.');
    };

    ws.onerror = error => {
      console.error('웹소켓 에러 발생:', error);
    };

    // 컴포넌트가 언마운트될 때 웹소켓 닫기
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage) {
      socket.send(inputMessage);
      setInputMessage(''); // 입력창 초기화
    }
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <main className={styles.container}>
      {/* <GatheringInfoOfThread
        thumbnail={gatheringInfo.thumbnail}
        title={gatheringInfo.title}
        description={gatheringInfo.content}
        place={`${gatheringInfo.city} ${gatheringInfo.county}`}
        meetingId={gatheringInfo.meetingId}
        participants={gatheringInfo.userParticipantResponseList}
        className={styles.gatheringInfo}
      /> */}
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
          value={inputMessage}
          onChange={e => setInputMessage(e.target.value)}
          onKeyUp={handlePressEnter}
          onClick={() => sendMessage()}
        />
      </div>
    </main>
  );
}
