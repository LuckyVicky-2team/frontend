'use client';

import Button from '@/components/common/Button';
import AuthInput from '../../AuthInput';
import { getNickNameDupCheck } from '@/api/apis/authApis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialSignupFormType } from '@/types/request/authRequestTypes';
import { useForm } from 'react-hook-form';
import AuthTagInput from '../../AuthTagInput';
import { usePostSocialSignupForm } from '@/api/queryHooks/auth';
import { useToast } from '@/contexts/toastContext';
import { getTokenFromCookie } from '@/actions/AuthActions';
import styles from './SocialSignupForm.module.scss';

export default function SocialSignupForm() {
  const router = useRouter();
  const [isNickNameDupOk, setIsNickNameDupOk] = useState(false);
  const [token, setToken] = useState('');
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      nickName: '',
      prTags: [],
    } as SocialSignupFormType,
  });

  const { mutate: signupMutate, isPending } = usePostSocialSignupForm();

  const nickNameDupCheck = async (nickName: string) => {
    try {
      await getNickNameDupCheck(nickName);
      setIsNickNameDupOk(true);
    } catch (error: any) {
      if (error.response.data.errorCode === 4002) {
        setError(
          'nickName',
          { message: '이미 존재하는 닉네임입니다', type: 'shouldUnregister' },
          { shouldFocus: true }
        );
      } else {
        addToast('중복확인 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  const submitSocialSignupForm = (formData: SocialSignupFormType) => {
    signupMutate(
      { data: formData, token },
      {
        onSuccess: () => {
          localStorage.setItem('accessToken', token);
          router.push('/signup/result?type=social');
        },
        onError: () => {
          addToast('회원가입 중 오류가 발생했습니다.', 'error');
        },
      }
    );
  };

  useEffect(() => {
    const transferToken = async () => {
      const token = await getTokenFromCookie();

      if (token) {
        setToken(`Bearer ${token}`);
      }
    };

    transferToken();
  }, []);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(formData => submitSocialSignupForm(formData))}>
      <div className={styles.buttonInput}>
        <AuthInput
          labelName="닉네임"
          placeholder="닉네임을 입력해주세요"
          error={errors.nickName}
          disabled={isNickNameDupOk}
          {...register('nickName', {
            required: '닉네임을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9가-힣]+$/,
              message: '닉네임은 한글과 영어, 숫자만 사용 가능합니다',
            },
            maxLength: {
              value: 8,
              message: '닉네임은 최대 8자까지 입력 가능합니다',
            },
          })}
        />
        <Button
          onClick={() => {
            if (!errors.nickName && getValues('nickName')) {
              nickNameDupCheck(getValues('nickName'));
            }
          }}
          disabled={isNickNameDupOk}
          className={styles.checkButton}>
          중복확인
        </Button>
      </div>
      <AuthTagInput setValue={setValue} />
      <Button
        disabled={
          isPending ||
          !getValues('nickName') ||
          Boolean(Object.keys(errors).length)
        }
        type="submit">
        확인
      </Button>
    </form>
  );
}
