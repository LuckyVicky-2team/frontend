import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'white' | 'blue';
}

export default function Button({
  children,
  className,
  type = 'button',
  color = 'blue',
  ...props
}: IButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[color]} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
