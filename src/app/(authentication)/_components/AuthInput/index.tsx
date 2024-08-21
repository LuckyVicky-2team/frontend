'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import Image from 'next/image';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import Input from '@/components/common/Input';
import styles from './AuthInput.module.scss';

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  handleToggleEye?: () => void;
  eyeState?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

export default forwardRef<HTMLInputElement, IAuthInputProps>(function AuthInput(
  {
    className,
    type,
    handleToggleEye,
    eyeState,
    labelName,
    disabled,
    error,
    ...props
  },
  ref
) {
  return (
    <div className={`${styles.container} ${className}`}>
      <label className={styles.label} htmlFor={labelName}>
        {labelName}
      </label>
      <div className={styles.inputContainer}>
        <Input
          type={eyeState ? 'text' : type}
          ref={ref}
          id={labelName}
          isError={Boolean(error)}
          disabled={disabled}
          className={eyeState !== undefined ? styles.passwordInput : ''}
          {...props}
        />
        {eyeState !== undefined && (
          <button
            className={styles.eyeButton}
            onClick={handleToggleEye}
            type="button">
            <Image
              src={
                eyeState
                  ? '/assets/icons/openEye.svg'
                  : '/assets/icons/closedEye.svg'
              }
              alt={eyeState ? 'password-visible' : 'password-invisible'}
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
      {error?.message && (
        <span className={styles.errorMessage}>{String(error.message)}</span>
      )}
      {disabled && (
        <span className={styles.successMessage}>중복확인이 완료되었습니다</span>
      )}
    </div>
  );
});
