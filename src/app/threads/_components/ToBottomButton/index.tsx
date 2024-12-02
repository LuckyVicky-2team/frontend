import { MouseEventHandler } from 'react';
import styles from './ToBottomButton.module.scss';

interface IToBottomButtonProps {
  onClick: MouseEventHandler;
  className?: string;
}

export default function ToBottomButton({
  onClick,
  className,
}: IToBottomButtonProps) {
  return (
    <button className={`${styles.circle} ${className}`} onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.icon}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </svg>
    </button>
  );
}
