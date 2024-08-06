import styles from './ThreadsPage.module.scss';

async function getThreads() {
  const thread = {
    profile: '/assets/icons/kakao_logo.svg',
    name: '코드잇',
    participantsCount: 4,
    recentMessage: '배고프다',
    unreadCount: 4,
  };

  const threads = Array.from({ length: 5 }, (_, i) => {
    return { ...thread, gatheringId: i };
  });

  return threads;
}

export default async function ThreadsPage() {
  const threads = await getThreads();

  console.log(threads);

  return (
    <div className={styles.background}>
      <div className={styles.container}></div>
    </div>
  );
}
