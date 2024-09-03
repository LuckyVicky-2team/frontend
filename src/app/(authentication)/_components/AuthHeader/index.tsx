'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';
import styles from './AuthHeader.module.scss';

interface IAuthHeaderProps {
  onClick?: MouseEventHandler;
}

export default function AuthHeader({ onClick }: IAuthHeaderProps) {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <button type="button" onClick={onClick || (() => router.back())}>
        <Image
          src="/assets/mainImages/backIcon.svg"
          alt="돌아가기"
          width={16}
          height={16}
        />
      </button>
    </header>
  );
}
