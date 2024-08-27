import Link from 'next/link';
import styles from './AuthTitle.module.scss';

interface IAuthTitleProps {
  title: string;
  text?: string;
}

export default function AuthTitle({ title, text }: IAuthTitleProps) {
  return (
    <div className={styles.logo}>
      <Link href="/main" className={styles.link}>
        <h1 className={styles.title}>BOGO</h1>
      </Link>
      <h2 className={styles.subTitle}>{title}</h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
