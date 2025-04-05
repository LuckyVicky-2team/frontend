import styles from './account.module.scss';
export default function Account() {
  return (
    <div className={styles.account}>
      <h1 className={styles.title}>계정 삭제 안내</h1>
      <h2>계정 삭제를 요청하시려면 아래 이메일 주소로 문의해주세요</h2>
      <p className={styles.email}>📧 boardgocustomer@gmail.com</p>
      <p>*삭제되는 항목 : 로그인 정보, 위치 정보, 푸시 알림 식별자</p>
      <p className={styles.warning}>요청 후 7일 이내 삭제됩니다</p>
    </div>
  );
}
