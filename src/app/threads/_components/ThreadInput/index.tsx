'use client';

import Image from 'next/image';
import styles from './ThreadInput.module.scss';

export default function ThreadInput() {
  return (
    <div className={styles.container}>
      <input
        className={styles.threadInput}
        placeholder="메세지를 입력해주세요."
      />
      <button className={styles.submitButton}>
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
