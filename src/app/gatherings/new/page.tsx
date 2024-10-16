'use client';

import styles from './New.module.scss';
import GatheringForm from '../[id]/_components/GatheringForm';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

export default function NewGatheringPage() {
  return (
    <div className={styles.body}>
      <GatheringForm mode={'create'} />
    </div>
  );
}
