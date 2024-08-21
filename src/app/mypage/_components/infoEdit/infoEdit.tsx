'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './infoEdit.module.scss';
import {
  updatePersonalInfo,
  checkNicknameDuplication,
} from '@/api/apis/mypageApis';

interface InfoEditProps {
  handleEditOpen: () => void;
  updateInfo: () => void;
}

interface FormData {
  nickName: string;
  password: string;
}

export default function InfoEdit({
  handleEditOpen,
  updateInfo,
}: InfoEditProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [isNameChecked, setIsNameChecked] = useState<boolean>(false);
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const newName = watch('nickName', '');

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickName: string): boolean => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,8}$/; // 한글, 영어, 숫자만 사용 가능하고 8자 이하
    return nicknameRegex.test(nickName);
  };

  const checkNickname = async () => {
    if (!validateNickname(newName)) {
      setError('nickName', {
        type: 'manual',
        message:
          '닉네임은 한글, 영어, 숫자만 사용 가능하며 8자 이하로 입력해주세요.',
      });
      setIsNameChecked(false);
      setIsNameDuplicate(false);
      setErrorMessage('');
      return;
    }

    try {
      await checkNicknameDuplication(newName);
      setIsNameDuplicate(false);
      setErrorMessage('사용 가능한 닉네임입니다.');
      setIsNameChecked(true);
      clearErrors('nickName'); // 중복 체크 성공 시 에러를 지웁니다.
    } catch (error: any) {
      if (error.response?.status === 400) {
        setIsNameDuplicate(true);
        setError('nickName', {
          type: 'manual',
          message: '이미 사용 중인 닉네임입니다.',
        });
        setErrorMessage(''); // Clear any previous success message
      } else {
        setErrorMessage('닉네임 확인 중 오류가 발생했습니다.');
      }
      setIsNameChecked(true);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await updatePersonalInfo(data.nickName, data.password);
      console.log('수정 완료:', res.data);
      updateInfo(); // 부모 컴포넌트의 정보를 업데이트
      handleEditOpen(); // 창을 닫음
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className={styles.infoEditModal}>
      <div className={styles.title}>개인정보 수정</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.nameInput}>
          <b>닉네임</b>
          <input
            type="text"
            placeholder={'변경하고 싶은 닉네임을 입력해주세요.'}
            {...register('nickName', {
              required: '닉네임을 입력해주세요.',
              validate: validateNickname,
            })}
            onChange={() => {
              setIsNameChecked(false);
              setErrorMessage('');
            }}
          />
          <button
            type="button"
            onClick={checkNickname}
            className={styles.checkBtn}
            // disabled={newName.trim().length === 0}
          >
            중복 체크
          </button>
          {errors.nickName && (
            <div className={styles.error}>{errors.nickName.message}</div>
          )}
          {errorMessage && !errors.nickName && (
            <div className={isNameDuplicate ? styles.error : styles.success}>
              {errorMessage}
            </div>
          )}
        </div>
        <div className={styles.passwordInput}>
          <b>비밀번호 (선택)</b>
          <input
            type="password"
            placeholder={'변경하고 싶은 비밀번호를 입력해주세요.'}
            {...register('password')}
          />
        </div>
        <button
          type="submit"
          className={
            isNameChecked && !isNameDuplicate
              ? styles.editBtn
              : styles.disabledBtn
          }
          disabled={!isNameChecked || isNameDuplicate}>
          수정하기
        </button>
        <button
          type="button"
          className={styles.cancleBtn}
          onClick={handleEditOpen}>
          취소하기
        </button>
      </form>
    </div>
  );
}
