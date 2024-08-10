import Link from 'next/link';
import AuthHeader from '../_components/AuthHeader';
import SignupForm from '../_components/SignupForm';
import styles from './Signup.module.scss';

export default function Signup({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return (
    <main className={styles.container}>
      <AuthHeader
        text="보고에 회원가입 해주셔서 감사합니다."
        title="회원가입하기"
      />
      <SignupForm isSocial={searchParams.type === 'social'} />
      <div className={styles.linkContainer}>
        이미 회원이신가요?
        <Link href="/signin" className={styles.loginLink}>
          로그인
        </Link>
      </div>
    </main>
  );
}
