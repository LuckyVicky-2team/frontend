import { ButtonHTMLAttributes } from 'react';
import styles from './AuthSubmitButton.module.scss';

interface IAuthSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AuthSubmitButton({
  children,
  ...props
}: IAuthSubmitButtonProps) {
  return (
    <button className={styles.submitButton} {...props}>
      {children}
    </button>
  );
}
