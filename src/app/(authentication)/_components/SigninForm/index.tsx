'use client';

import { useForm } from 'react-hook-form';
import AuthInput from '../AuthInput';
import AuthSubmitButton from '../AuthSubmitButton';
import styles from './SigninForm.module.scss';

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(data => {
        console.log(data);
      })}>
      <AuthInput
        labelName="아이디"
        type="email"
        placeholder="이메일을 입력해주세요"
        error={errors.email}
        {...register('email', {
          required: '이메일을 입력해주세요',
        })}
      />
      <AuthInput
        labelName="비밀번호"
        isPasswordInput={true}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
        {...register('password', {
          required: '비밀번호를 입력해주세요',
        })}
      />
      <AuthSubmitButton>로그인하기</AuthSubmitButton>
    </form>
  );
}
