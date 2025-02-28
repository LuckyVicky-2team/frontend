import Image from 'next/image';
import styles from './SignupResult.module.scss';
import Button from '@/components/common/Button';
import Link from 'next/link';

export default function SignupResult({
  searchParams,
}: {
  searchParams: { type: 'local' | 'social' };
}) {
  const { type } = searchParams;

  return (
    <main className={styles.container}>
      <div className={styles.welcome}>
        <Image
          src="/assets/authImages/firework.png"
          alt="welcome"
          width={320}
          height={320}
        />
        <h1 className={styles.title}>
          BOGO
          <br />
          회원가입을 축하드립니다!
        </h1>
        <p className={styles.contents}>
          어떤 사람들과
          <br />
          어떤 플레이를 하게 될까요?!
        </p>
      </div>
      <Link href={type === 'local' ? '/signin' : '/main'}>
        <Button>BOGO 즐기러 가기</Button>
      </Link>
    </main>
  );
}
