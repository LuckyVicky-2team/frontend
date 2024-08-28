import styles from './RollingDice.module.scss';

export default function RollingDice() {
  return (
    <div className={styles.dice}>
      <div className={`${styles.face} ${styles.one}`}>
        <div className={styles.innerFace}>
          <div className={styles.dot}></div>
        </div>
      </div>

      <div className={`${styles.face} ${styles.two}`}>
        <div className={styles.innerFace}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>

      <div className={`${styles.face} ${styles.three}`}>
        <div className={styles.innerFace}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>

      <div className={`${styles.face} ${styles.four}`}>
        <div className={styles.innerFace}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>

      <div className={`${styles.face} ${styles.five}`}>
        <div className={styles.innerFace}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>

      <div className={`${styles.face} ${styles.six}`}>
        <div className={styles.innerFace}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
}
