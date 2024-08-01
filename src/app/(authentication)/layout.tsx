import { ReactNode } from 'react';
import styles from './AuthLayout.module.scss';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.background}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
