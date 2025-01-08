'use client';

import styles from './New.module.scss';
import GatheringForm from '../[id]/_components/GatheringForm';
import { useGameList } from '@/api/queryHooks/game';

// 나중에 Input 컴포넌트로 뺄 것들은 빼겠습니다.
// 생성일 추가? (상의)

export default function NewGatheringPage() {
  const { data: _data } = useGameList();
  return (
    <div className={styles.body}>
      <GatheringForm mode={'create'} />
    </div>
  );
}
