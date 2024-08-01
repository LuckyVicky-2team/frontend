'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { FieldErrors } from 'react-hook-form';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName?: keyof FormData;
  errors?: FieldErrors<FormData>;
  isPasswordInput?: boolean;
}

export default forwardRef<HTMLInputElement, IInputProps>(function Input(
  { className, type, fieldName, errors, isPasswordInput, ...props },
  ref
) {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleEyeToggle = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <div>
      <div className={styles.inputContainer}>
        <input
          className={`${styles.input} ${errors && styles.error} ${className}`}
          type={passwordVisible ? 'text' : type}
          ref={ref}
          {...props}
        />
        {isPasswordInput && (
          <button className={styles.eyeButton} onClick={handleEyeToggle}>
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
