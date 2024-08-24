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
          src="/assets/icons/backArrow.svg"
          alt="돌아가기"
          width={36}
          height={36}
        />
      </button>
    </header>
  );
}
