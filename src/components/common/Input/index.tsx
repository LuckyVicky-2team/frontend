import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default forwardRef<HTMLInputElement, IInputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input ref={ref} className={`${styles.input} ${className}`} {...props} />
  );
});
