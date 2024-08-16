import Image from 'next/image';
import { useState } from 'react';
import styles from './NumberInput.module.scss';
import styles2 from '../../New.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';

interface INumberInputProps {
  setValue: UseFormSetValue<INewGatheringFormValuesRequest>;
}

export default function NumberInput({ setValue }: INumberInputProps) {
  const [count, setCount] = useState(2);

  console.log(styles);
  console.log(styles2);

  const handleDecrement = () => {
    if (count !== 2) {
      setCount(prev => prev - 1);
      setValue('limitParticipant', count - 1);
    }
  };
  const handleIncrement = () => {
    if (count !== 30) {
      setCount(prev => prev + 1);
      setValue('limitParticipant', count + 1);
    }
  };

  return (
    <div className={styles.input}>
      <button
        className={`${styles.leftButton} ${count === 2 ? styles.gray : styles.blue}`}
        onClick={handleDecrement}
        type="button">
        {count === 2 ? (
          <Image
            src={'/assets/icons/minus-gray.svg'}
            alt="- 이미지"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={'/assets/icons/minus-blue.svg'}
            alt="- 이미지"
            width={24}
            height={24}
          />
        )}
      </button>
      <div
        className={`${styles.numberBackground}  ${count === 30 || count === 2 ? styles.gray : styles.blue}`}>
        <h2
          className={`${styles.number}  ${count === 30 || count === 2 ? styles.grayFont : styles.blueFont}`}>
          {count}
        </h2>
      </div>
      <button
        className={`${styles.rightButton} ${count === 30 ? styles.gray : styles.blue}`}
        onClick={handleIncrement}
        type="button">
        {count === 30 ? (
          <Image
            src={'/assets/icons/plus-gray.svg'}
            alt="+ 이미지"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={'/assets/icons/plus-blue.svg'}
            alt="+ 이미지"
            width={24}
            height={24}
          />
        )}
      </button>
    </div>
  );
}
