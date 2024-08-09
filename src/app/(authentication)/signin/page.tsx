import Link from 'next/link';
import Image from 'next/image';
import AuthHeader from '../_components/AuthHeader';
import SpeechBalloon from '../_components/SpeechBalloon';
import SigninForm from '../_components/SigninForm';
import styles from './Signin.module.scss';

export default function Signin() {
  return (
    <main className={styles.container}>
      <AuthHeader title="로그인" />
      <SigninForm />
      <div className={styles.buttons}>
        <Link href="/" className={styles.guideButton}>
          BOGO가 처음이신가요?
        </Link>
        <Link className={styles.squareButton} href="/signup">
          이메일로 회원가입하기
          <SpeechBalloon
            className={styles.balloon}
            balloonDimension={{ width: 115, height: 35 }}
            textPosition={{ x: 22, y: 19 }}
          />
        </Link>
        <div className={styles.socialLogin}>
          <button className={`${styles.roundButton} ${styles.google}`}>
            <Image
              src="/assets/icons/google_logo.svg"
              alt="google-login"
              width={36}
              height={36}
            />
          </button>
          <button className={`${styles.roundButton} ${styles.kakao}`}>
            <Image
              src="/assets/icons/kakao_logo.svg"
              alt="google-login"
              fill
              style={{ objectFit: 'cover' }}
            />
          </button>
        </div>
      </div>
    </main>
  );
}
