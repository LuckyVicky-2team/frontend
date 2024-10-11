'use client';
import styles from './Notification.module.scss';
import {
  useNotificationList,
  useReadNotification,
} from '@/api/queryHooks/notification';
import Spinner from '@/components/common/Spinner';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import { INotification } from '@/types/response/notification';

export default function NotificationPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const { data, isPending, refetch } = useNotificationList();
  const { mutate } = useReadNotification();

  const handleReadAllButtonClick = (data: INotification[]) => {
    const unreadNotificationIds = data
      .filter(notification => notification.isRead === false)
      .map(notification => notification.notificationId);
    if (unreadNotificationIds.length === 0) {
      addToast('이미 알림을 모두 읽었습니다.', 'error');
      return;
    }
    mutate(unreadNotificationIds, {
      onError: _ => {
        addToast('알림 전체 읽기에 실패했습니다.', 'error');
      },
    });
    refetch();
  };

  const handleNotificationClick = (notificationId: number, pathUrl: string) => {
    mutate([notificationId], {
      onError: _ => {
        addToast('알림 읽기에 실패했습니다.', 'error');
      },
    });
    router.push(pathUrl);
  };

  return (
    <div className={styles.body}>
      {isPending ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : !data ? (
        <div className={styles.spinner}>알림이 없습니다.</div>
      ) : (
        <div className={styles.content}>
          <button
            className={styles.readAllButton}
            type="button"
            onClick={() => handleReadAllButtonClick(data)}>
            전체 읽음
          </button>
          <div className={styles.notifications}>
            {data &&
              data.map(notification => {
                return (
                  <button
                    key={notification.notificationId}
                    className={
                      notification.isRead
                        ? styles.blueNotification
                        : styles.notification
                    }
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification.notificationId,
                        notification.pathUrl
                      )
                    }>
                    <div>
                      <div className={styles.title}>{notification.title}</div>
                      <div className={styles.content}>
                        {notification.content}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
