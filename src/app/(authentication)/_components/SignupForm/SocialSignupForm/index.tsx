'use client';

import Button from '@/components/common/Button';
import AuthInput from '../../AuthInput';
import { getNickNameDupCheck } from '@/api/apis/authApis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialSignupFormType } from '@/types/request/authRequestTypes';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import AuthTagInput from '../../AuthTagInput';
import { usePostSocialSignupForm } from '@/api/queryHooks/auth';
import { useToast } from '@/contexts/toastContext';
import { getTokenFromCookie } from '@/actions/AuthActions';
import { useFunnel } from '@/hooks/useFunnel';
import AuthTitle from '../../AuthTitle';
import AuthHeader from '../../AuthHeader';
import styles from './SocialSignupForm.module.scss';

export default function SocialSignupForm() {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel('first');

  const [isNickNameDupOk, setIsNickNameDupOk] = useState(false);
  const [nickNameDupLoading, setNickNameDupLoading] = useState(false);

  const [token, setToken] = useState('');
  const { addToast } = useToast();

  const props = useForm({
    mode: 'onChange',
    defaultValues: {
      nickName: '',
      prTags: [],
    } as SocialSignupFormType,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    control,
    watch,
  } = props;

  const { mutate: signupMutate, isPending } = usePostSocialSignupForm();

  const nickNameDupCheck = async (nickName: string) => {
    try {
      setNickNameDupLoading(true);
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
    } finally {
      setNickNameDupLoading(false);
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
    <FormProvider {...props}>
      <AuthHeader
        onClick={currentStep === 'second' ? () => setStep('first') : undefined}
      />
      <form>
        <Funnel>
          <Step name="first">
            <div className={styles.formArea}>
              <AuthTitle
                text="보고에 회원가입 해주셔서 감사합니다."
                title="회원가입하기"
              />
              <div className={styles.buttonInput}>
                <Controller
                  name="nickName"
                  control={control}
                  rules={{
                    required: '닉네임을 입력해주세요',
                    pattern: {
                      value: /^[가-힣a-zA-Z0-9ㄱ-ㅎ]+$/,
                      message: '닉네임은 한글과 영어, 숫자만 사용 가능합니다',
                    },
                    minLength: {
                      value: 2,
                      message: '닉네임은 최소 2자부터 등록 가능합니다',
                    },
                    maxLength: {
                      value: 8,
                      message: '닉네임은 최대 8자까지 입력 가능합니다',
                    },
                  }}
                  render={({ field }) => (
                    <AuthInput
                      labelName="닉네임"
                      placeholder="닉네임을 입력해주세요"
                      disabled={isNickNameDupOk}
                      autoComplete="nickname"
                      fieldName="nickName"
                      {...field}
                    />
                  )}
                />
                <Button
                  onClick={() => nickNameDupCheck(getValues('nickName'))}
                  disabled={
                    isNickNameDupOk ||
                    nickNameDupLoading ||
                    !!errors.nickName ||
                    !watch('nickName')
                  }
                  className={styles.checkButton}>
                  중복확인
                </Button>
              </div>
              <Button
                onClick={() => {
                  setStep('second');
                }}
                className={styles.button}
                disabled={
                  isPending ||
                  !watch('nickName') ||
                  !isValid ||
                  !isNickNameDupOk
                }>
                확인
              </Button>
            </div>
          </Step>

          <Step name="second">
            <div className={styles.formArea}>
              <AuthTitle
                text="나를 소개하는 PR 태그를 등록해보세요!"
                title="나를 소개하기"
              />
              <AuthTagInput />
              <Button
                onClick={() => {
                  handleSubmit(formData => {
                    submitSocialSignupForm(formData);
                  })();
                }}
                disabled={isPending}
                className={styles.button}>
                PR 태그 등록하기
              </Button>
              <Button
                onClick={() => {
                  handleSubmit(formData => {
                    formData.prTags = [];
                    submitSocialSignupForm(formData);
                  })();
                }}
                disabled={isPending}
                color="white"
                className={styles.button}>
                건너뛰기
              </Button>
            </div>
          </Step>
        </Funnel>
      </form>
    </FormProvider>
  );
}
