import Link from 'next/link';
import ThreadListItem from './_components/ThreadListItem';
import styles from './ThreadsPage.module.scss';

const getThreads = async () => {
  const thread = {
    profileImage: '/assets/images/default_profile.png',
    name: '코드잇',
    recentMessage: {
      createdAt: '2024-08-05T12:38:42',
      contents: '배고파.. 오늘 점심 뭐 먹을래?',
    },
    unreadCount: 3,
  };

  const threads = Array.from({ length: 12 }, (_, i) => {
    return { ...thread, gatheringId: i };
  });

  return threads;
};

export default async function ThreadsPage() {
  const threads = await getThreads();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>채팅방</h1>
      <div className={styles.threads}>
        {threads.map(thread => {
          return (
            <Link
              href={`/threads/${thread.gatheringId}`}
              key={thread.gatheringId}>
              <ThreadListItem
                profileImage={thread.profileImage}
                name={thread.name}
                recentMessage={thread.recentMessage}
                unreadCount={thread.unreadCount}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
