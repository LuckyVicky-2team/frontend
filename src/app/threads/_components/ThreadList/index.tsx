'use client';

import Link from 'next/link';
import ThreadListItem from './ThreadListItem';
import { useGetMyChatrooms } from '@/api/queryHooks/thread';
import { IChatroomsResponse } from '@/types/response/ChatroomsRES';
import Spinner from '@/components/common/Spinner';
import styles from './ThreadList.module.scss';

export default function ThreadList() {
  const { data: threads, isError, isPending } = useGetMyChatrooms();

  return (
    <div className={styles.threads}>
      {isPending ? (
        <div className={styles.except}>
          <Spinner />
        </div>
      ) : isError ? (
        <div className={styles.except}>채팅방을 불러오는데 실패했습니다.</div>
      ) : threads ? (
        threads.map((thread: IChatroomsResponse) => {
          if (!thread.chatRoomId) return;

          return (
            <Link
              href={{
                pathname: `/threads/${thread.chatRoomId}`,
                query: { meeting: thread.meetingId },
              }}
              key={thread.chatRoomId}>
              <ThreadListItem
                thumbnail={thread.thumbnail}
                name={thread.meetingTitle}
                recentMessage={thread.lastMessage}
                lastSendDateTime={thread.lastSendDatetime}
              />
            </Link>
          );
        })
      ) : (
        <div className={styles.except}>나의 채팅방이 존재하지 않습니다.</div>
      )}
    </div>
  );
}
