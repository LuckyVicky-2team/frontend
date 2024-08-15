// import Image from 'next/image';
import { useState } from 'react';
import styles from './NumberInput.module.scss';

export default function NumberInput() {
  const [count, setCount] = useState(2);

  const handleDecrement = () => {};
  const handleIncrement = () => {};
  void setCount;
  return (
    <div className={styles.input}>
      <button className={styles.leftButton} onClick={handleDecrement}>
        {/* <Image /> */}
      </button>
      <div className={styles.numberBackground}>
        <h2 className={styles.number}>{count}</h2>
      </div>
      <button className={styles.rightButton} onClick={handleIncrement}>
        {/* <Image /> */}
      </button>
    </div>
  );
}
