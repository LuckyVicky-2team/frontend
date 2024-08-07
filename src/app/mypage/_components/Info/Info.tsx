import styles from './info.module.scss';

export default function Info() {
  return (
    <div className={styles.relative}>
      <button className={styles.editBtn}>개인정보 수정</button>
      <div className={styles.top}>
        <div>프로필사진</div>
        <div>
          <div>닉네임</div>
          <div>자잘한 정보 나오는곳</div>
        </div>
      </div>
      <div>
        <div>별점,리뷰</div>
        <div>참여중인모임</div>
        <div>개설중인모임</div>
      </div>
    </div>
  );
}
