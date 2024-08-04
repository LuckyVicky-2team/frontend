import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export default forwardRef<HTMLInputElement, IInputProps>(function Input(
  { className, isError, ...props },
  ref
) {
  return (
    <input
      className={`${styles.input} ${isError && styles.error} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
