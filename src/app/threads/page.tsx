import ThreadListItem from './_components/ThreadListItem';
import styles from './ThreadsPage.module.scss';

async function getThreads() {
  const thread = {
    profileImage: '/assets/images/default_profile.png',
    name: '코드잇',
    participantsCount: 4,
    recentMessage: {
      createdAt: '2024-08-05T17:38:42',
      contents: '배고파..',
    },
    unreadCount: 4,
  };

  const threads = Array.from({ length: 5 }, (_, i) => {
    return { ...thread, gatheringId: i };
  });

  return threads;
}

export default async function ThreadsPage() {
  const threads = await getThreads();

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        {threads.map(thread => {
          return (
            <ThreadListItem
              key={thread.gatheringId}
              profileImage={thread.profileImage}
              name={thread.name}
              participantsCount={thread.participantsCount}
              recentMessage={thread.recentMessage}
              unreadCount={thread.unreadCount}
            />
          );
        })}
      </div>
    </div>
  );
}
