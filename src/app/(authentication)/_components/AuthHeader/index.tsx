import Image from 'next/image';
import styles from './AuthHeader.module.scss';

interface IAuthHeaderProps {
  hasImage?: boolean;
  text?: string;
}

export default function AuthHeader({ hasImage, text }: IAuthHeaderProps) {
  return (
    <div className={styles.logo}>
      {hasImage && (
        <Image
          src={'/assets/icons/logo.svg'}
          alt="logo"
          width={86}
          height={87}
          className={styles.logoImage}
        />
      )}
      <h1 className={styles.title}>BOGO</h1>
      <h2 className={styles.subTitle}>로그인</h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
