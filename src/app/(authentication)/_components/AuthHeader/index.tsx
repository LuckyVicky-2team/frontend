import Link from 'next/link';
import styles from './AuthHeader.module.scss';

interface IAuthHeaderProps {
  title: string;
  text?: string;
}

export default function AuthHeader({ title, text }: IAuthHeaderProps) {
  return (
    <div className={styles.logo}>
      <Link href="/main">
        <h1 className={styles.title}>BOGO</h1>
      </Link>
      <h2 className={styles.subTitle}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
