import AuthInput from '../_components/AuthInput';
import AuthHeader from '../_components/AuthHeader';
import styles from './Signin.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import SpeechBalloon from '../_components/SpeechBalloon';

export default function Signin() {
  return (
    <main className={styles.container}>
      <AuthHeader hasImage={true} title="로그인" />
      <form className={styles.form}>
        <AuthInput
          labelName="아이디"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <AuthInput
          labelName="비밀번호"
          isPasswordInput={true}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <button className={`${styles.button} ${styles.login}`}>
          로그인하기
        </button>
      </form>

      <div className={styles.buttons}>
        <Link href="/" className={styles.guideLink}>
          BOGO가 처음이신가요?
        </Link>
        <Link className={`${styles.button} ${styles.email}`} href="/signup">
          이메일로 회원가입하기
          <SpeechBalloon
            className={styles.balloon}
            balloonDimension={{ width: 115, height: 35 }}
            textPosition={{ x: 22, y: 19 }}
          />
        </Link>
        <button className={`${styles.button} ${styles.google}`}>
          <Image
            src="/assets/icons/google_logo.svg"
            alt="google-login"
            width={30}
            height={30}
          />
          구글로 로그인
        </button>
        <button className={`${styles.button} ${styles.kakao}`}>
          <Image
            src="/assets/icons/kakao_logo.svg"
            alt="google-login"
            width={30}
            height={30}
          />
          카카오로 로그인
        </button>
      </div>
    </main>
  );
}
