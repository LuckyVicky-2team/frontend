import styles from './mypage.module.scss';
import Info from '../_components/Info/Info';

export default function MyPage() {
  return (
    <div className={styles.relative}>
      <h1 className={styles.title}>마이페이지</h1>
      <div>
        <Info />
      </div>
    </div>
  );
}
