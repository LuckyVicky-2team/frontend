import { ButtonHTMLAttributes } from 'react';
import styles from './AuthSubmitButton.module.scss';

interface IAuthSubmitButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function AuthSubmitButton({
  children,
  className,
  type = 'submit',
  ...props
}: IAuthSubmitButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.submitButton} ${className}`}
      {...props}>
      {children}
    </button>
  );
}
