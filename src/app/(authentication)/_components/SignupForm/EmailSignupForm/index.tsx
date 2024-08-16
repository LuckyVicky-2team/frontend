'use client';

import { useState } from 'react';
import AuthInput from '../../AuthInput';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import { useFunnel } from '@/hooks/useFunnel';
import AuthTagInput from '../../AuthTagInput';
import { getEmailDupCheck, getNickNameDupCheck } from '@/api/apis/authApis';
import { EmailSignupFormType } from '@/types/request/authRequestTypes';
import { usePostEmailSignupForm } from '@/api/queryHooks/auth';
import { useRouter } from 'next/navigation';
import styles from './EmailSignupForm.module.scss';

export default function EmailSignupForm() {
  const router = useRouter();
  const { Funnel, Step, setStep } = useFunnel('first');
  const [isEmailDupOk, setIsEmailDupOk] = useState(false);
  const [isNickNameDupOk, setIsNickNameDupOk] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickName: '',
      password: '',
      passwordCheck: '',
      prTags: [],
      providerType: 'LOCAL',
    } as EmailSignupFormType & { passwordCheck: string },
  });
  const { mutate: signupMutate, isPending } = usePostEmailSignupForm();

  const emailDupCheck = async (email: string) => {
    try {
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
        console.log(error);
      }
    }
  };

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
        console.log(error);
      }
    }
  };

  const submitEmailSignupForm = (
    formData: EmailSignupFormType & { passwordCheck: string }
  ) => {
    const { passwordCheck: _passwordCheck, ...newFormData } = formData;

    signupMutate(newFormData, {
      onSuccess: () => {
        console.log('회원가입에 성공했습니다');
        router.push('/signup/result');
      },
      onError: () => {
        console.log('에러가 발생했습니다.');
      },
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(formData => submitEmailSignupForm(formData))}>
      <Funnel>
        <Step name="first">
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
            <Button
              onClick={async () => {
                if (!errors.email && getValues('email')) {
                  emailDupCheck(getValues('email'));
                }
              }}
              disabled={isEmailDupOk}
              className={styles.checkButton}>
              중복확인
            </Button>
          </div>
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
              onBlur: async () => {
                await trigger('passwordCheck');
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
              validate: value =>
                value === getValues('password') ||
                '비밀번호와 일치하지 않습니다',
            })}
          />
          <Button
            onClick={() => {
              setStep('second');
            }}
            disabled={
              Boolean(Object.keys(errors).length) ||
              !isEmailDupOk ||
              !isNickNameDupOk ||
              !getValues('password') ||
              !getValues('passwordCheck')
            }>
            확인
          </Button>
        </Step>

        <Step name="second">
          <AuthTagInput setValue={setValue} />
          <Button disabled={isPending} type="submit">
            확인
          </Button>
        </Step>
      </Funnel>
    </form>
  );
}
