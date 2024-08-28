import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '@/contexts/toastContext';
import styles from './infoEdit.module.scss';
import {
  updatePersonalInfo,
  checkNicknameDuplication,
} from '@/api/apis/mypageApis';
import ProfileEdit from '../profileImageEdit/profileImageEdit';
import Image from 'next/image';

interface IInfoEditProps {
  handleEditOpen: () => void;
  updateInfo: () => void;
  mypageInfo: {
    profileImage: string | null;
    nickName: string;
  };
}

interface IFormData {
  nickName: string;
  password: string;
  confirmPassword: string;
}

export default function InfoEdit({
  handleEditOpen,
  updateInfo,
  mypageInfo,
}: IInfoEditProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
    // watch,
  } = useForm<IFormData>({
    mode: 'onChange',
  });

  const { addToast } = useToast();

  const [isNameChecked, setIsNameChecked] = useState<boolean>(false);
  const [isNameDuplicate, setIsNameDuplicate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(prev => !prev);

  const handleUploadSuccess = () => {
    updateInfo(); // 부모 컴포넌트의 정보를 업데이트
    handleEditOpen(); // 프로필 이미지 수정 모달 닫기
    setTimeout(() => {
      window.location.reload(); // 페이지 새로고침
    }, 1500);
  };

  // 비밀번호와 비밀번호 확인 검사 함수
  // const validatePasswords = () => {
  //   if (confirmPasswordValue.trim() === '') {
  //     return;
  //   }

  //   if (passwordValue !== confirmPasswordValue) {
  //     setError('confirmPassword', {
  //       type: 'manual',
  //       message: '비밀번호가 일치하지 않습니다.',
  //     });
  //   } else {
  //     clearErrors('confirmPassword');
  //   }
  // };

  // 비밀번호 입력 필드에서 onChange 이벤트에 validatePasswords 추가
  // const handlePasswordChange = (value: string) => {
  //   setPasswordValue(value);
  //   validatePasswords();
  // };

  // const handleConfirmPasswordChange = (value: string) => {
  //   setConfirmPasswordValue(value);
  //   validatePasswords();
  // };

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickName: string): boolean => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{1,8}$/;
    return nicknameRegex.test(nickName);
  };

  // 닉네임 중복 체크 함수
  const checkNickname = async () => {
    if (!validateNickname(nameValue)) {
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
      await checkNicknameDuplication(nameValue);
      setIsNameDuplicate(false);
      setErrorMessage('사용 가능한 닉네임입니다.');
      addToast('사용 가능한 닉네임입니다.', 'success');
      setIsNameChecked(true);
      clearErrors('nickName');
    } catch (error: any) {
      if (error.response?.status === 400) {
        setIsNameDuplicate(true);
        setError('nickName', {
          type: 'manual',
          message: '이미 사용 중인 닉네임입니다.',
        });
        setErrorMessage('');
        addToast('이미 사용 중인 닉네임입니다.', 'error');
      } else {
        setErrorMessage('닉네임 확인 중 오류가 발생했습니다.');
        addToast('닉네임 확인 중 오류가 발생했습니다.', 'error');
      }
      setIsNameChecked(true);
    }
  };

  // 개인정보 수정 제출 함수
  const onSubmit: SubmitHandler<IFormData> = async data => {
    if (passwordValue !== confirmPasswordValue) {
      addToast(
        '비밀번호가 일치하지 않습니다. 다시 한번 확인 해주세요.',
        'error'
      );
      return;
    }

    try {
      const updateData: { nickName: string; password?: string } = {
        nickName: data.nickName,
      };

      if (data.password.trim()) {
        updateData.password = data.password;
      }

      const _res = await updatePersonalInfo(
        updateData.nickName,
        updateData.password
      );

      updateInfo();
      reset();
      handleEditOpen();
      addToast('개인정보가 수정되었습니다.', 'success');
    } catch (error) {
      void error;
      addToast('정보 수정 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className={styles.infoEditModal}>
      <div className={styles.logoTitle}>BOGO</div>
      <div className={styles.title}>프로필 수정하기</div>
      <ProfileEdit
        onUploadSuccess={handleUploadSuccess}
        initialImage={mypageInfo?.profileImage} // `initialImage` 속성을 추가
        mypageInfo={mypageInfo}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.nameInput}>
          <b>닉네임</b>
          <div className={styles.prFlex}>
            <input
              type="text"
              placeholder="변경하고 싶은 닉네임을 입력해주세요."
              {...register('nickName', {
                required: '닉네임을 입력해주세요.',
                validate: validateNickname,
              })}
              onChange={e => {
                setNameValue(e.currentTarget.value);
                setIsNameChecked(false);
                setErrorMessage('');
              }}
            />
            <button
              type="button"
              onClick={checkNickname}
              className={nameValue ? styles.on : styles.off}
              disabled={!nameValue}>
              중복 체크
            </button>
          </div>
          {errors.nickName && (
            <div className={styles.errorMessage}>{errors.nickName.message}</div>
          )}
          {errorMessage && !errors.nickName && (
            <div
              className={
                isNameDuplicate ? styles.errorMessage : styles.successMessage
              }>
              {errorMessage}
            </div>
          )}
        </div>
        <div className={styles.passwordInput}>
          <b>비밀번호 (선택)</b>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="변경하고 싶은 비밀번호를 입력해주세요."
              {...register('password')}
              value={passwordValue}
              onChange={e => setPasswordValue(e.currentTarget.value)}
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={togglePasswordVisibility}>
              {showPassword ? (
                <Image
                  width={24}
                  height={24}
                  src={'/assets/icons/openEye.svg'}
                  alt="비밀번호 눈뜬 아이콘"
                />
              ) : (
                <Image
                  width={24}
                  height={24}
                  src={'/assets/icons/closedEye.svg'}
                  alt="비밀번호 눈감은 아이콘"
                />
              )}
            </button>
          </div>
        </div>
        <div className={styles.passwordInput}>
          <b>비밀번호 확인 (선택)</b>
          <div className={styles.passwordWrapper}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="비밀번호를 다시 입력해주세요."
              {...register('confirmPassword')}
              value={confirmPasswordValue}
              onChange={e => setConfirmPasswordValue(e.currentTarget.value)}
            />
            <button
              type="button"
              className={styles.eyeIcon}
              onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? (
                <Image
                  width={24}
                  height={24}
                  src={'/assets/icons/openEye.svg'}
                  alt="비밀번호 눈뜬 아이콘"
                />
              ) : (
                <Image
                  width={24}
                  height={24}
                  src={'/assets/icons/closedEye.svg'}
                  alt="비밀번호 눈감은 아이콘"
                />
              )}
            </button>
          </div>
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
