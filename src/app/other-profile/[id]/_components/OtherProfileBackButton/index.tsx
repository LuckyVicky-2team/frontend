'use client';

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from '@/components/common/BackButton';
import styles from './OtherProfileBackButton.module.scss';
import { useGetOtherProfile } from '@/api/queryHooks/otherProfile';

interface IOTherProfileBackButton {
  userId: string;
  gatheringId: string;
  open: string;
}

export default function OtherProfileBackButton({
  userId,
  gatheringId,
  open,
}: IOTherProfileBackButton) {
  const { data } = useGetOtherProfile(+userId);

  if (!data || 'errorCode' in data) {
    return notFound();
  }

  return (
    <div className={styles.backButton}>
      {gatheringId && open ? (
        <Link href={`/gatherings/${gatheringId}?open=${open}`} replace>
          <Image
            src="/assets/icons/backArrow.svg"
            alt="돌아가기"
            width={24}
            height={24}
          />
        </Link>
      ) : (
        <BackButton />
      )}
      <p className={styles.pageTitle}>{data.nickName} 님의 프로필</p>
    </div>
  );
}
