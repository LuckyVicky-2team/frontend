import styles from './friendsList.module.scss';
import Image from 'next/image';

export default function FriendsList() {
  return (
    <div className={styles.relative}>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>친구목록</h2>
        <button type="button">
          <Image
            src={'/assets/myPageImages/friendsPlus.svg'}
            alt="친구추가 아이콘"
            width={24}
            height={24}
          />
          <span>친구추가</span>
        </button>
      </div>
      <div className={styles.subTitle}>친구목록</div>
      <div></div>
    </div>
  );
}
