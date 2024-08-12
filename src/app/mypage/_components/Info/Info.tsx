import styles from './info.module.scss';

export default function Info() {
  return (
    <div className={styles.relative}>
      <div className={styles.card}>
        <div className={styles.top}>
          <h2>내 프로필</h2>
          <button type="button">편집</button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.profileImg}>
            <button>
              <img src="/assets/myPageImages/profileImgEdit.png" alt="" />
            </button>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.topInfo}>
              <b>럽윈즈올</b>
              <button>로그아웃</button>
            </div>
            <ul className={styles.list}>
              <li>
                <b>company.</b>
                <p>코드잇</p>
              </li>
              <li>
                <b>E-mail.</b>
                <p>codeit@codeit.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
