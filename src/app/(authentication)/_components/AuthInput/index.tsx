'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { FieldErrors } from 'react-hook-form';
import Input from '@/components/common/Input';
import styles from './AuthInput.module.scss';

interface IAuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName?: keyof FormData;
  errors?: FieldErrors<FormData>;
  isPasswordInput?: boolean;
  labelName?: string;
}

export default forwardRef<HTMLInputElement, IAuthInputProps>(function AuthInput(
  { className, type, fieldName, errors, isPasswordInput, labelName, ...props },
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
          isError={Boolean(errors)}
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
      {errors && fieldName && errors[fieldName] && (
        <span className={styles.errorMessage}>{errors[fieldName].message}</span>
      )}
    </div>
  );
});
