'use client';

import Button from '@/components/common/Button';
import AuthInput from '../../AuthInput';
import { getNickNameDupCheck, postLogout } from '@/api/apis/authApis';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialSignupFormType } from '@/types/request/authRequestTypes';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import AuthTagInput from '../../AuthTagInput';
import {
  useGetTermsAgreement,
  usePostSocialSignupForm,
} from '@/api/queryHooks/auth';
import { useToast } from '@/contexts/toastContext';
import { useFunnel } from '@/hooks/useFunnel';
import AuthTitle from '../../AuthTitle';
import AuthHeader from '../../AuthHeader';
import ConsentForm from '../ConsentForm';
import Spinner from '@/components/common/Spinner';
import { reissueTokenViaServer, saveRefreshToken } from '@/actions/AuthActions';
import styles from './SocialSignupForm.module.scss';

interface ITermsAgreementResponseType {
  type: string;
  title: string;
  content: string;
  required: boolean;
}

export default function SocialSignupForm() {
  const router = useRouter();
  const { Funnel, Step, setStep, currentStep } = useFunnel('first');

  const [isNickNameDupOk, setIsNickNameDupOk] = useState(false);
  const [nickNameDupLoading, setNickNameDupLoading] = useState(false);

  const [at, setAt] = useState('');
  const [rt, setRt] = useState('');

  console.log(at, rt);

  const { addToast } = useToast();

  const props = useForm({
    mode: 'onChange',
    defaultValues: {
      nickName: '',
      prTags: [],
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
    } as SocialSignupFormType,
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    control,
    watch,
    setValue,
    trigger,
    clearErrors,
  } = props;

  const {
    data: termsConditionsData,
    isPending: isTermsPending,
    isError,
  } = useGetTermsAgreement('all');

  const { mutate: signupMutate, isPending: isSignupPending } =
    usePostSocialSignupForm();

  const firstButtonDisabledCondition =
    isSignupPending ||
    !watch('nickName') ||
    !isValid ||
    !isNickNameDupOk ||
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

  const submitSocialSignupForm = (formData: SocialSignupFormType) => {
    signupMutate(
      { data: formData, token: at },
      {
        onSuccess: async () => {
          localStorage.setItem('accessToken', at);
          await saveRefreshToken(rt);
          router.replace('/signup/result?type=social');
        },
        onError: () => {
          addToast('회원가입 중 오류가 발생했습니다.', 'error');
        },
      }
    );
  };

  useEffect(() => {
    const tempSaveToken = async () => {
      if (at && rt) return;

      const tokens = await reissueTokenViaServer();

      if (tokens.errorCode) {
        addToast(
          '회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.',
          'error'
        );
        await postLogout();
        router.replace('/signin');
        return;
      }

      setAt(tokens.at);
      setRt(tokens.rt);

      await postLogout();
    };

    tempSaveToken();
  }, []);

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
                disabled={isSignupPending}
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
