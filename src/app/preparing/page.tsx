'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';
import styles from './Preparing.module.scss';

export default function Preparing() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.image}>
          <Image
            src="/assets/images/construction.png"
            alt="preparing"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p className={styles.title}>공사 중인 페이지에요!</p>
        <p className={styles.subTitle}>더 흥미진진한 게임을 준비 중입니다!</p>
      </div>
      <Button onClick={() => router.back()}>이전 페이지로 가기</Button>
    </main>
  );
}
