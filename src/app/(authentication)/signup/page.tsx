import BackButton from '@/components/common/BackButton';
import styles from './Signup.module.scss';
import AuthHeader from '../_components/AuthHeader';
import AuthInput from '../_components/AuthInput';
import AuthSubmitButton from '../_components/AuthSubmitButton';
import Link from 'next/link';

export default function Signup() {
  return (
    <>
      <header className={styles.header}>
        <BackButton />
      </header>
      <div className={styles.container}>
        <AuthHeader
          text="보고에 회원가입 해주셔서 감사합니다."
          title="회원가입하기"
        />
        <form className={styles.form}>
          <AuthInput labelName="이름" />
          <AuthInput labelName="아이디" />
          <AuthInput labelName="닉네임" />
          <AuthInput labelName="비밀번호" isPasswordInput={true} />
          <AuthInput labelName="비밀번호 확인" isPasswordInput={true} />
          <AuthSubmitButton>확인</AuthSubmitButton>
        </form>
        <div className={styles.linkContainer}>
          이미 회원이신가요?
          <Link href="/signin" className={styles.loginLink}>
            로그인
          </Link>
        </div>
      </div>
    </>
  );
}
