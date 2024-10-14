'use client';

import Link from 'next/link';
import ThreadListItem from './ThreadListItem';
import { useGetMyChatrooms } from '@/api/queryHooks/thread';
import { IChatroomResponse } from '@/types/response/ChatroomsRES';
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
      ) : (
        threads &&
        threads.map((thread: IChatroomResponse) => {
          if (!thread.chatRoomId) return;

          return (
            <Link
              href={`/threads/${thread.chatRoomId}`}
              key={thread.chatRoomId}>
              <ThreadListItem
                thumbnail={thread.thumbnail}
                name={thread.meetingTitle}
                recentMessage={thread.lastMessage}
                lastSendDateTime={thread.lastSendDateTime}
              />
            </Link>
          );
        })
      )}
    </div>
  );
}
