'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { useFunnel } from '@/hooks/useFunnel';
import AuthInput from '../../AuthInput';
import Button from '@/components/common/Button';
import AuthTagInput from '../../AuthTagInput';
import { getEmailDupCheck, getNickNameDupCheck } from '@/api/apis/authApis';
import { EmailSignupFormType } from '@/types/request/authRequestTypes';
import { usePostEmailSignupForm } from '@/api/queryHooks/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import AuthHeader from '../../AuthHeader';
import AuthTitle from '../../AuthTitle';
import styles from './EmailSignupForm.module.scss';

export default function EmailSignupForm() {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel('first');
  const { addToast } = useToast();

  const [isEmailDupOk, setIsEmailDupOk] = useState(false);
  const [emailDupLoading, setEmailDupLoading] = useState(false);

  const [isNickNameDupOk, setIsNickNameDupOk] = useState(false);
  const [nickNameDupLoading, setNickNameDupLoading] = useState(false);

  const props = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
      prTags: [],
      providerType: 'LOCAL',
    } as EmailSignupFormType & { passwordCheck: string },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    watch,
    trigger,
  } = props;

  const { mutate: signupMutate, isPending } = usePostEmailSignupForm();

  const emailDupCheck = async (email: string) => {
    try {
      setEmailDupLoading(true);
      await getEmailDupCheck(email);
      setIsEmailDupOk(true);
    } catch (error: any) {
      if (error.response.data.errorCode === 4002) {
        setError(
          'email',
          { message: '이미 존재하는 이메일입니다', type: 'shouldUnregister' },
          { shouldFocus: true }
        );
      } else {
        addToast('중복확인 중 오류가 발생했습니다.', 'error');
      }
    } finally {
      setEmailDupLoading(false);
    }
  };

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

  const submitEmailSignupForm = (
    formData: EmailSignupFormType & { passwordCheck: string }
  ) => {
    const { passwordCheck: _passwordCheck, ...newFormData } = formData;

    signupMutate(newFormData, {
      onSuccess: () => {
        router.push('/signup/result?type=local');
      },
      onError: () => {
        addToast('회원가입 중 오류가 발생했습니다.', 'error');
      },
    });
  };

  useEffect(() => {
    if (watch('password') === watch('passwordCheck')) {
      trigger('passwordCheck');
    }
  }, [watch('password'), trigger]);

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
                  name="email"
                  control={control}
                  rules={{
                    required: '이메일을 입력해주세요',
                    pattern: {
                      value: /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/,
                      message: '이메일 형식이 맞지 않습니다',
                    },
                  }}
                  render={({ field }) => (
                    <AuthInput
                      labelName="이메일"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      disabled={isEmailDupOk}
                      autoComplete="email"
                      fieldName="email"
                      {...field}
                    />
                  )}
                />
                <Button
                  onClick={() => emailDupCheck(getValues('email'))}
                  disabled={
                    isEmailDupOk ||
                    emailDupLoading ||
                    !!errors.email ||
                    !watch('email')
                  }
                  className={styles.checkButton}>
                  중복확인
                </Button>
              </div>

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

              <Controller
                name="password"
                control={control}
                rules={{
                  required: '비밀번호를 입력해주세요',
                  pattern: {
                    value: /^[a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~-]*$/,
                    message:
                      '비밀번호는 영어, 숫자, 특수문자만 사용 가능합니다',
                  },
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다',
                  },
                  maxLength: {
                    value: 50,
                    message: '비밀번호는 최대 50자까지 입력 가능합니다',
                  },
                }}
                render={({ field }) => (
                  <AuthInput
                    labelName="비밀번호"
                    hasEye
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    autoComplete="new-password"
                    fieldName="password"
                    {...field}
                  />
                )}
              />

              <Controller
                name="passwordCheck"
                control={control}
                rules={{
                  validate: value =>
                    value === watch('password') ||
                    '비밀번호와 일치하지 않습니다',
                }}
                render={({ field }) => (
                  <AuthInput
                    labelName="비밀번호 확인"
                    hasEye
                    type="password"
                    placeholder="비밀번호를 다시 한 번 입력해주세요"
                    autoComplete="new-password"
                    fieldName="passwordCheck"
                    {...field}
                  />
                )}
              />

              <Button
                onClick={() => {
                  setStep('second');
                }}
                disabled={
                  !isValid ||
                  !isEmailDupOk ||
                  !isNickNameDupOk ||
                  !watch('password') ||
                  !watch('passwordCheck')
                }
                className={styles.button}>
                확인
              </Button>

              <div className={styles.linkContainer}>
                이미 회원이신가요?
                <Link href="/signin" className={styles.loginLink}>
                  로그인
                </Link>
              </div>
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
                    submitEmailSignupForm(formData);
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
                    submitEmailSignupForm(formData);
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
