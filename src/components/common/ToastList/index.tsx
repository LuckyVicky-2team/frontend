'use client';

import { useToast } from '@/contexts/toastContext';
import styles from './ToastList.module.scss';

export default function ToastList() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.container}>
      {[...toasts].reverse().map(toast => (
        <button
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          onClick={() => {
            removeToast(toast.id);
          }}>
          {toast.message}
        </button>
      ))}
    </div>
  );
}
