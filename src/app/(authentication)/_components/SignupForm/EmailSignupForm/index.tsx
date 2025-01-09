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
import {
  useGetTermsAgreement,
  usePostEmailSignupForm,
} from '@/api/queryHooks/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/toastContext';
import AuthHeader from '../../AuthHeader';
import AuthTitle from '../../AuthTitle';
import ConsentForm from '../ConsentForm';
import Spinner from '@/components/common/Spinner';
import styles from './EmailSignupForm.module.scss';

interface ITermsAgreementResponseType {
  type: string;
  title: string;
  content: string;
  required: boolean;
}

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
      termsConditions: [
        {
          termsConditionsType: 'TERMS',
          agreement: false,
        },
        {
          termsConditionsType: 'PRIVACY',
          agreement: false,
        },
        {
          termsConditionsType: 'LOCATION',
          agreement: false,
        },
        {
          termsConditionsType: 'AGE14',
          agreement: false,
        },
        {
          termsConditionsType: 'PUSH',
          agreement: false,
        },
      ],
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
    setValue,
    clearErrors,
  } = props;

  const {
    data: termsConditionsData,
    isPending: isTermsPending,
    isError,
  } = useGetTermsAgreement('all');

  const { mutate: signupMutate, isPending: isSignupPending } =
    usePostEmailSignupForm();

  const firstButtonDisabledCondition =
    !isValid ||
    !isEmailDupOk ||
    !isNickNameDupOk ||
    !watch('password') ||
    !watch('passwordCheck') ||
    !termsConditionsData.every((item: ITermsAgreementResponseType) => {
      if (item.required) {
        return (
          watch('termsConditions').find(
            term => item.type === term.termsConditionsType
          )?.agreement === true
        );
      }
      return true;
    });

  const emailDupCheck = async (email: string) => {
    if (errors.email?.type === 'needDupCheck') {
      clearErrors('email');
    }

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
    if (errors.nickName?.type === 'needDupCheck') {
      clearErrors('nickName');
    }

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
        router.replace('/signup/result?type=local');
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

  useEffect(() => {
    setIsEmailDupOk(false);
  }, [watch('email')]);

  useEffect(() => {
    setIsNickNameDupOk(false);
  }, [watch('nickName')]);

  if (!termsConditionsData || 'errorCode' in termsConditionsData) {
    addToast('회원가입 페이지를 불러오는데 실패했습니다.', 'error');
    router.back();
    return;
  }

  return (
    <FormProvider {...props}>
      <AuthHeader
        onClick={currentStep === 'second' ? () => setStep('first') : undefined}
      />
      <form className={styles.form}>
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
                      autoComplete="email"
                      fieldName="email"
                      isValidated={isEmailDupOk}
                      {...field}
                    />
                  )}
                />
                <Button
                  onClick={() => emailDupCheck(getValues('email'))}
                  disabled={
                    isEmailDupOk ||
                    emailDupLoading ||
                    !watch('email') ||
                    errors.email
                      ? errors.email?.type === 'needDupCheck'
                        ? false
                        : true
                      : false
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
                      autoComplete="nickname"
                      fieldName="nickName"
                      isValidated={isNickNameDupOk}
                      {...field}
                    />
                  )}
                />
                <Button
                  onClick={() => nickNameDupCheck(getValues('nickName'))}
                  disabled={
                    isNickNameDupOk ||
                    nickNameDupLoading ||
                    !watch('nickName') ||
                    errors.nickName
                      ? errors.nickName?.type === 'needDupCheck'
                        ? false
                        : true
                      : false
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
              {isTermsPending ? (
                <div className={styles.consentExcept}>
                  <Spinner />
                </div>
              ) : isError ? (
                <div className={styles.consentExcept}>
                  약관 내용을 불러올 수 없습니다.
                </div>
              ) : (
                <ConsentForm
                  conditions={termsConditionsData}
                  setValue={value => setValue('termsConditions', value)}
                  value={watch('termsConditions')}
                />
              )}
              <div
                style={{ cursor: 'pointer' }}
                onClick={async () => {
                  await trigger();

                  if (!errors.email && !isEmailDupOk) {
                    setError('email', {
                      message: '이메일 중복확인을 해주세요.',
                      type: 'needDupCheck',
                    });
                  }

                  if (!errors.nickName && !isNickNameDupOk) {
                    setError('nickName', {
                      message: '닉네임 중복확인을 해주세요.',
                      type: 'needDupCheck',
                    });
                  }
                }}>
                <Button
                  onClick={() => {
                    setStep('second');
                  }}
                  disabled={firstButtonDisabledCondition}
                  style={
                    firstButtonDisabledCondition
                      ? { pointerEvents: 'none' }
                      : undefined
                  }
                  className={styles.button}>
                  확인
                </Button>
              </div>

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
                disabled={isSignupPending}
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
                disabled={isSignupPending}
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
