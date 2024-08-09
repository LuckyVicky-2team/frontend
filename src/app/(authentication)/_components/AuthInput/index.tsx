'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import Input from '@/components/common/Input';
import styles from './AuthInput.module.scss';

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  labelName: string;
  isPasswordInput?: boolean;
}

export default forwardRef<HTMLInputElement, IAuthInputProps>(function AuthInput(
  { className, type, error, isPasswordInput, labelName, disabled, ...props },
  ref
) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleEyeToggle = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <div className={`${styles.container} ${className}`}>
      {labelName && (
        <label className={styles.label} htmlFor={labelName}>
          {labelName}
        </label>
      )}
      <div className={styles.inputContainer}>
        <Input
          type={passwordVisible ? 'text' : type}
          ref={ref}
          id={labelName}
          isError={Boolean(error)}
          disabled={disabled}
          className={isPasswordInput ? styles.passwordInput : ''}
          {...props}
        />
        {isPasswordInput && (
          <button
            className={styles.eyeButton}
            onClick={handleEyeToggle}
            type="button">
            <Image
              src={
                passwordVisible
                  ? '/assets/icons/openEye.svg'
                  : '/assets/icons/closedEye.svg'
              }
              alt={passwordVisible ? 'password-visible' : 'password-invisible'}
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
