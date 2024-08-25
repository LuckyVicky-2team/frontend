'use client';

import Image from 'next/image';
import { useGetOtherProfile } from '@/api/queryHooks/otherProfile';
import { notFound } from 'next/navigation';
import MannerBar from '../MannerBar';
import HeartRating from '../HeartRating';
import styles from './OtherProfile.module.scss';

export default function OtherProfile({ userId }: { userId: number }) {
  const { data } = useGetOtherProfile(userId);

  if (!data) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          <Image
            src={'/assets/images/defaultProfile.png'}
            alt="profile-image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.textArea}>
          <div className={styles.nickName}>{data.nickName}</div>
          <div className={styles.subText}>
            <span className={styles.manner}>매너능력치</span>
            <MannerBar rating={data.averageRating} />
          </div>
        </div>
      </div>

      <HeartRating rating={data.averageRating} className={styles.heartRating} />
    </div>
  );
}
