'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import Input from '@/components/common/Input';
import styles from './AuthInput.module.scss';

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelName: string;
  fieldName: string;
  hasEye?: boolean;
  isValidated?: boolean;
}

export default forwardRef<HTMLInputElement, IAuthInputProps>(function AuthInput(
  {
    className,
    type,
    labelName,
    fieldName,
    hasEye = false,
    isValidated = false,
    ...props
  },
  ref
) {
  const {
    formState: { errors },
  } = useFormContext();

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={`${styles.container} ${className}`}>
      <label className={styles.label} htmlFor={labelName}>
        {labelName}
      </label>
      <div className={styles.inputContainer}>
        <Input
          type={passwordVisible ? 'text' : type}
          ref={ref}
          id={labelName}
          isError={!!errors[fieldName]}
          className={hasEye ? styles.passwordInput : ''}
          {...props}
        />
        {hasEye && (
          <button
            className={styles.eyeButton}
            onClick={() => setPasswordVisible(prev => !prev)}
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
      {errors[fieldName]?.message && (
        <span className={styles.errorMessage}>
          {String(errors[fieldName]?.message)}
        </span>
      )}
      {isValidated && (
        <span className={styles.successMessage}>중복확인이 완료되었습니다</span>
      )}
    </div>
  );
});
