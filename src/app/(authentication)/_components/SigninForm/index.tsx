'use client';

import { FormProvider, useForm } from 'react-hook-form';
import AuthInput from '../AuthInput';
import Button from '@/components/common/Button';
import { usePostSigninForm } from '@/api/queryHooks/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import { setAccessToken } from '@/utils/changeAccessToken';
import styles from './SigninForm.module.scss';
// import { getCookie } from '@/utils/getCookie';

export default function SigninForm() {
  const router = useRouter();

  const props = useForm({ mode: 'onChange' });

  const { register, handleSubmit, watch, trigger } = props;

  const { addToast } = useToast();

  const { mutate: signinMutate, isPending } = usePostSigninForm();

  const submitSigninForm = (data: FormData) => {
    signinMutate(data, {
      onSuccess: (response: any) => {
        const token = response.headers.authorization;
        console.log('로그인 성공, 토큰:', token);
        setAccessToken(token);
        router.replace('/main');
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          addToast('아이디나 비밀번호가 올바르지 않습니다', 'error');
        } else {
          addToast('로그인에 실패했습니다', 'error');
        }
      },
    });
  };

  return (
    <FormProvider {...props}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(data => {
          const signinForm = new FormData();
          signinForm.append('username', data.username);
          signinForm.append('password', data.password);

          submitSigninForm(signinForm);
        })}>
        <AuthInput
          fieldName="username"
          labelName="아이디"
          type="email"
          placeholder="이메일을 입력해주세요"
          autoComplete="email"
          {...register('username', {
            required: '이메일을 입력해주세요',
          })}
        />
        <AuthInput
          fieldName="password"
          labelName="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="off"
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
        />
        <div style={{ cursor: 'pointer' }} onClick={() => trigger()}>
          <Button
            type="submit"
            disabled={!watch('username') || !watch('password') || isPending}
            style={
              !watch('username') || !watch('password') || isPending
                ? { pointerEvents: 'none' }
                : undefined
            }>
            로그인하기
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
