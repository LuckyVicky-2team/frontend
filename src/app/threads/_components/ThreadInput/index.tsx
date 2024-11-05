'use client';

import { InputHTMLAttributes, MouseEventHandler } from 'react';
import Image from 'next/image';
import styles from './ThreadInput.module.scss';

interface IThreadInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClick: MouseEventHandler;
}

export default function ThreadInput({ onClick, ...props }: IThreadInputProps) {
  return (
    <div className={styles.container}>
      <input
        className={styles.threadInput}
        placeholder="메세지를 입력해주세요."
        {...props}
      />
      <button className={styles.submitButton} onClick={onClick}>
        <Image
          src="/assets/icons/send.svg"
          alt="보내기"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
