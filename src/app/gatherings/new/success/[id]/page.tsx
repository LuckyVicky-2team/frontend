'use client';

import Image from 'next/image';
import styles from './Success.module.scss';
import { useRouter } from 'next/navigation';

export default function NewSuccess({ params }: { params: any }) {
  const { id } = params;
  const router = useRouter();
  const handleGoToGatherings = () => {
    router.replace(`/gatherings/${id}`);
  };

  const handleCreateNewGathering = () => {
    router.replace('/gatherings/new');
  };

  return (
    <div className={styles.background}>
      <Image
        src={'/assets/images/new-success.png'}
        alt="성공 이미지"
        width={250}
        height={250}
        onError={e => (e.currentTarget.src = '/assets/images/logo.png')}
      />
      <h1 className={styles.title}>모임이 개설되었어요!</h1>
      <p className={styles.description}>
        어떤 사람들과 <br />
        어떤 플레이를 하게 될까요?
      </p>
      <button
        type="button"
        className={styles.gatheringsButton}
        onClick={handleGoToGatherings}>
        등록된 모임 확인하러가기
      </button>
      <button
        type="button"
        className={styles.newGatheringButton}
        onClick={handleCreateNewGathering}>
        모임 더 등록하기
      </button>
    </div>
  );
}
