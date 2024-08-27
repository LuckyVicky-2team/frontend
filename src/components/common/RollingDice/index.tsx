import Image from 'next/image';
import styles from './RollingDice.module.scss';

export default function RollingDice() {
  return (
    <div className={styles.dice}>
      <Image
        src="/assets/icons/dice-01.svg"
        alt="dice1"
        width={100}
        height={100}
        className={`${styles.face} ${styles.one}`}
      />
      <Image
        src="/assets/icons/dice-02.svg"
        alt="dice2"
        width={100}
        height={100}
        className={`${styles.face} ${styles.two}`}
      />
      <Image
        src="/assets/icons/dice-03.svg"
        alt="dice3"
        width={100}
        height={100}
        className={`${styles.face} ${styles.three}`}
      />
      <Image
        src="/assets/icons/dice-04.svg"
        alt="dice4"
        width={100}
        height={100}
        className={`${styles.face} ${styles.four}`}
      />
      <Image
        src="/assets/icons/dice-05.svg"
        alt="dice5"
        width={100}
        height={100}
        className={`${styles.face} ${styles.five}`}
      />
      <Image
        src="/assets/icons/dice-06.svg"
        alt="dice6"
        width={100}
        height={100}
        className={`${styles.face} ${styles.six}`}
      />
    </div>
  );
}
