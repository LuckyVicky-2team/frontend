import styles from './mypage.module.scss';
import Info from '../_components/Info/Info';
import Link from 'next/link';

export default function MyPage() {
  return (
    <div className={styles.relative}>
      <h1 className={styles.title}>마이페이지</h1>
      <div>
        <Info />
      </div>
      <div className={styles.prWrap}>
        <ul>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
          <li>PR태그</li>
        </ul>
      </div>
      <ul className={styles.menuWrap}>
        <li>
          <Link href="/mypage/id/friendsList">친구목록</Link>
        </li>
        <li>
          <Link href="/mypage/id/myGatherings">내 모임</Link>
        </li>
        <li>
          <Link href="/mypage/id/myFavoriteGatherings">찜한 모임</Link>
        </li>
        <li>
          <Link href="/">알림 설정</Link>
        </li>
        <li>
          <Link href="/mypage/id/review">리뷰</Link>
        </li>
      </ul>
    </div>
  );
}
