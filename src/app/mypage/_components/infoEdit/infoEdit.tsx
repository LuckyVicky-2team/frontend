import { useState, useEffect } from 'react';
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
  const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(true);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(prev => !prev);

  const handleUploadSuccess = () => {
    updateInfo();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // 비밀번호와 비밀번호 확인 비교 함수
  const validatePasswords = () => {
    if (passwordValue !== confirmPasswordValue) {
      setIsPasswordMatched(false);
      setError('confirmPassword', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
    } else {
      setIsPasswordMatched(true);
      clearErrors('confirmPassword');
    }
  };

  useEffect(() => {
    validatePasswords();
  }, [passwordValue, confirmPasswordValue]);

  // 닉네임 유효성 검사 함수
  const validateNickname = (nickName: string): boolean => {
    // 한글 자음, 한글 음절, 영어 대소문자, 숫자만 허용
    // 길이는 2자에서 8자까지 허용
    const nicknameRegex = /^[가-힣a-zA-Z0-9ㄱ-ㅎ]{2,8}$/;
    return nicknameRegex.test(nickName);
  };

  // 닉네임 중복 체크 함수
  const checkNickname = async () => {
    if (!validateNickname(nameValue)) {
      setError('nickName', {
        type: 'manual',
        message:
          '닉네임은 공백없이 한글, 영어, 숫자만 사용 가능하며 2자이상 8자 이하로 입력해주세요.',
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
  const onSubmit: SubmitHandler<IFormData> = async _data => {
    if (!isPasswordMatched) {
      addToast(
        '비밀번호가 일치하지 않습니다. 다시 한번 확인 해주세요.',
        'error'
      );
      return;
    }

    try {
      const updateData: { nickName?: string; password?: string } = {};

      if (nameValue && isNameChecked && !isNameDuplicate) {
        updateData.nickName = nameValue;
      }

      if (passwordValue.trim()) {
        updateData.password = passwordValue;
      }

      if (Object.keys(updateData).length === 0) {
        addToast('수정할 항목이 없습니다.', 'error');
        return;
      }

      // `updatePersonalInfo` 호출 시, `undefined`인 매개변수를 처리
      await updatePersonalInfo(
        updateData.nickName || '', // `nickName`이 `undefined`일 경우 빈 문자열로 처리
        updateData.password || '' // `password`가 `undefined`일 경우 빈 문자열로 처리
      );

      updateInfo();
      reset();
      handleEditOpen();
      addToast('개인정보가 수정되었습니다.', 'success');
    } catch (error) {
      addToast('정보 수정 중 오류가 발생했습니다.', 'error');
    }
  };

  const isFormValid = isPasswordMatched && (isNameChecked || !!passwordValue);

  return (
    <div className={styles.infoEditModal}>
      <button
        type={'button'}
        className={styles.modalClose}
        onClick={() => {
          handleEditOpen();
        }}>
        <Image
          width={32}
          height={32}
          src={'/assets/icons/x-circle.svg'}
          alt="모달닫기버튼"
        />
      </button>
      <div className={styles.logoTitle}>BOGO</div>
      <div className={styles.title}>프로필 수정하기</div>
      <ProfileEdit
        onUploadSuccess={handleUploadSuccess}
        initialImage={mypageInfo?.profileImage}
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
          {!isPasswordMatched && (
            <div className={styles.errorMessage}>
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        </div>
        <button
          type="submit"
          className={isFormValid ? styles.editBtn : styles.disabledBtn}
          disabled={!isFormValid}
          onClick={() => {
            handleUploadSuccess();
          }}>
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
