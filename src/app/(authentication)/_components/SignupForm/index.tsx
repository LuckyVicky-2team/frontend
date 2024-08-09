'use client';

// import { useFunnel } from '@/hooks/useFunnel';
import AuthInput from '../AuthInput';
import AuthSubmitButton from '../AuthSubmitButton';
import styles from './SignupForm.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function SignupForm() {
  // const { Funnel, Step, setStep, currentStep } = useFunnel('initial');
  const [isEmailDupOk, setIsEmailDupOk] = useState(false);
  const [isNicknameDupOk, setIsNicknameDupOk] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(data => {
        console.log(data);
      })}>
      <div className={styles.buttonInput}>
        <AuthInput
          labelName="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email}
          disabled={isEmailDupOk}
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/,
              message: '이메일 형식이 맞지 않습니다',
            },
          })}
        />
        <AuthSubmitButton
          type="button"
          onClick={() => {
            setIsEmailDupOk(prev => !prev);
          }}
          disabled={isEmailDupOk}
          className={styles.checkButton}>
          중복확인
        </AuthSubmitButton>
      </div>
      <div className={styles.buttonInput}>
        <AuthInput
          labelName="닉네임"
          placeholder="닉네임을 입력해주세요"
          error={errors.nickname}
          disabled={isNicknameDupOk}
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9가-힣]+$/,
              message: '닉네임 형식이 맞지 않습니다',
            },
            maxLength: {
              value: 8,
              message: '닉네임은 최대 8자까지 입력 가능합니다',
            },
          })}
        />
        <AuthSubmitButton
          type="button"
          onClick={() => {
            setIsNicknameDupOk(prev => !prev);
          }}
          disabled={isNicknameDupOk}
          className={styles.checkButton}>
          중복확인
        </AuthSubmitButton>
      </div>
      <AuthInput
        labelName="비밀번호"
        isPasswordInput={true}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
        {...register('password', {
          required: '비밀번호를 입력해주세요',
          pattern: {
            value: /^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~-]*$/,
            message: '비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다',
          },
          minLength: {
            value: 8,
            message: '비밀번호는 최소 8자 이상이어야 합니다',
          },
          maxLength: {
            value: 50,
            message: '비밀번호는 최대 50자까지 입력 가능합니다',
          },
        })}
      />
      <AuthInput
        labelName="비밀번호 확인"
        isPasswordInput={true}
        type="password"
        placeholder="비밀번호를 다시 한 번 입력해주세요"
        error={errors.passwordCheck}
        {...register('passwordCheck', {
          validate: {
            equalToPassword: value =>
              value === watch('password') || '비밀번호와 일치하지 않습니다',
          },
        })}
      />
      <AuthSubmitButton>확인</AuthSubmitButton>
    </form>
  );
}
