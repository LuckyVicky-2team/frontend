import KakaoList from '@/components/common/Kakao/KakaoList';
import styles from './YongTest.module.scss';

export default function YongTest() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <KakaoList />
      </div>
    </div>
  );
}
