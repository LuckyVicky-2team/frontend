import Image from 'next/image';
import styles from './Notification.module.scss';

export default function NotificationPage() {
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.deleteAllButton}>전체삭제</div>
        <div className={styles.notifications}>
          <div className={styles.notification}>
            <div>
              <div className={styles.title}>알림제목</div>
              <div className={styles.content}>
                세부내용ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
              </div>
              <div className={styles.userName}>userName</div>
            </div>
            <div className={styles.deleteButton}>
              <Image
                alt="삭제 버튼"
                src={'/assets/icons/trash.svg'}
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
