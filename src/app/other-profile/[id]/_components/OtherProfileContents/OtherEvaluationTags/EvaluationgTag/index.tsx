import Image from 'next/image';
import styles from './EvaluationTag.module.scss';

interface IEvaluationTag {
  count: number;
  text: string;
  type: 'POSITIVE' | 'NEGATIVE';
}

export default function EvaluationTag({ count, text, type }: IEvaluationTag) {
  return (
    <div className={styles.container}>
      <div className={styles.tagCount}>
        <Image
          src="/assets/icons/twoPeople.svg"
          alt={text}
          width={24}
          height={24}
        />
        <span className={styles.count}>{count}</span>
      </div>
      <div className={`${styles.text} ${styles[type]}`}>{text}</div>
    </div>
  );
}
