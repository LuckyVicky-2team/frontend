import Image from 'next/image';
import Link from 'next/link';
import styles from './AuthHeader.module.scss';

interface IAuthHeaderProps {
  title: string;
  text?: string;
}

export default function AuthHeader({ title, text }: IAuthHeaderProps) {
  return (
    <div className={styles.logo}>
      <Link href="/" className={styles.pageName}>
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
      </Link>
      <h2 className={styles.subTitle}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
