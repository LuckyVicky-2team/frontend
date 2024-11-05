import ThreadList from './_components/ThreadList';
import styles from './ThreadsPage.module.scss';

export default async function ThreadsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>채팅방</h1>
      <ThreadList />
    </main>
  );
}
