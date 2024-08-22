import Link from 'next/link';
import Image from 'next/image';
import AuthHeader from '../_components/AuthHeader';
import SpeechBalloon from '../_components/SpeechBalloon';
import SigninForm from '../_components/SigninForm';
import Button from '@/components/common/Button';
import styles from './Signin.module.scss';

export default function Signin() {
  return (
    <main className={styles.container}>
      <AuthHeader title="로그인" />
      <SigninForm />
      <div className={styles.buttons}>
        <p className={styles.guideText}>BOGO가 처음이신가요?</p>
        <Link className={styles.squareButton} href="/signup">
          <Button color="white">이메일로 회원가입하기</Button>
          <SpeechBalloon
            className={styles.balloon}
            balloonDimension={{ width: 115, height: 35 }}
            textPosition={{ x: 22, y: 19 }}
          />
        </Link>
        <div className={styles.socialLogin}>
          <Link
            href="https://dev.board-go.net/oauth2/authorization/google"
            className={`${styles.roundButton} ${styles.google}`}>
            <Image
              src="/assets/icons/google_logo.svg"
              alt="google-login"
              width={36}
              height={36}
            />
          </Link>
          <Link
            href="https://dev.board-go.net/oauth2/authorization/kakao"
            className={`${styles.roundButton} ${styles.kakao}`}>
            <Image
              src="/assets/icons/kakao_logo.svg"
              alt="kakao-login"
              fill
              style={{ objectFit: 'cover' }}
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
