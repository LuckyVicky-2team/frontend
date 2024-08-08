import styles from './mypage.module.scss';
import Info from '../_components/Info/Info';

export default function MyPage() {
  return (
    <div className={styles.relative}>
      <div>
        <Info />
      </div>
    </div>
  );
}
