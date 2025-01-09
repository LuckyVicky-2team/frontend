'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.wow}>!</div>
        <div className={styles.errorCode}>404</div>
        <Image
          src="/assets/icons/404.svg"
          alt="not-found"
          width={280}
          height={260}
        />
        <p className={styles.where}>엇? 여긴 어디지?</p>
      </div>
      <Button onClick={() => router.back()} className={styles.button}>
        이전 페이지로 가기
      </Button>
    </main>
  );
}
