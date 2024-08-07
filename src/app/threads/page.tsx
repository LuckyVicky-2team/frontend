import Link from 'next/link';
import ThreadListItem from './_components/ThreadListItem';
import styles from './ThreadsPage.module.scss';

const getThreads = async () => {
  const thread = {
    profileImage: '/assets/images/default_profile.png',
    name: '코드잇',
    participantsCount: 4,
    recentMessage: {
      createdAt: '2024-08-05T12:38:42',
      contents: '배고파.. 오늘 점심 뭐 먹을래?',
    },
    unreadCount: 3,
  };

  const threads = Array.from({ length: 5 }, (_, i) => {
    return { ...thread, gatheringId: i };
  });

  return threads;
};

export default async function ThreadsPage() {
  const threads = await getThreads();

  return (
    <div>
      <h1 className={styles.title}>나의 채팅방</h1>
      {threads.map(thread => {
        return (
          <Link
            href={{
              pathname: `/threads/${thread.gatheringId}`,
              query: { name: thread.name },
            }}
            key={thread.gatheringId}>
            <ThreadListItem
              profileImage={thread.profileImage}
              name={thread.name}
              participantsCount={thread.participantsCount}
              recentMessage={thread.recentMessage}
              unreadCount={thread.unreadCount}
            />
          </Link>
        );
      })}
    </div>
  );
}
