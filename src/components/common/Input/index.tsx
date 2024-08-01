import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputName?: keyof FormData;
  errors?: FieldErrors<FormData>;
}

export default forwardRef<HTMLInputElement, IInputProps>(function Input(
  { className, inputName, errors, ...props },
  ref
) {
  return (
    <div>
      <input
        className={`${styles.input} ${errors && styles.error} ${className}`}
        ref={ref}
        {...props}
      />
      {errors && inputName && errors[inputName] && (
        <span className={styles.errorMessage}>{errors[inputName].message}</span>
      )}
    </div>
  );
});
