'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthInput from '../AuthInput';
import Button from '@/components/common/Button';
import { usePostSigninForm } from '@/api/queryHooks/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import styles from './SigninForm.module.scss';

export default function SigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { addToast } = useToast();

  const { mutate: signinMutate, isPending } = usePostSigninForm();

  const submitSigninForm = (data: FormData) => {
    signinMutate(data, {
      onSuccess: (response: any) => {
        const token = response.headers.authorization;
        localStorage.setItem('accessToken', token);
        router.push('/main');
      },
      onError: () => {
        addToast('로그인에 실패했습니다.', 'error');
      },
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(data => {
        const signinForm = new FormData();
        signinForm.append('username', data.username);
        signinForm.append('password', data.password);

        submitSigninForm(signinForm);
      })}>
      <AuthInput
        labelName="아이디"
        type="email"
        placeholder="이메일을 입력해주세요"
        error={errors.username}
        autoComplete="email"
        {...register('username', {
          required: '이메일을 입력해주세요',
        })}
      />
      <AuthInput
        labelName="비밀번호"
        handleToggleEye={() => setPasswordVisible(prev => !prev)}
        eyeState={passwordVisible}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
        autoComplete="off"
        {...register('password', {
          required: '비밀번호를 입력해주세요',
        })}
      />
      <Button
        type="submit"
        disabled={!watch('username') || !watch('password') || isPending}>
        로그인하기
      </Button>
    </form>
  );
}
