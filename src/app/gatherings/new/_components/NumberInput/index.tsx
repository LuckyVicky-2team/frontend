import { useState } from 'react';
import Image from 'next/image';
import styles from './NumberInput.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';

interface INumberInputProps {
  setValue: UseFormSetValue<INewGatheringFormValuesRequest>;
  minParticipants?: number;
}

export default function NumberInput({
  setValue,
  minParticipants = 1,
}: INumberInputProps) {
  const arrangedMinNum = minParticipants ? minParticipants + 1 : 2;
  const [count, setCount] = useState(arrangedMinNum);

  const handleDecrement = () => {
    if (minParticipants && count > minParticipants + 1) {
      setCount((prev: number) => prev - 1);
      setValue('limitParticipant', count - 1);
    } else if (!minParticipants && count > 2) {
      setCount((prev: number) => prev - 1);
      setValue('limitParticipant', count - 1);
    }
  };
  const handleIncrement = () => {
    if (count !== 30) {
      setCount((prev: number) => prev + 1);
      setValue('limitParticipant', count + 1);
    }
  };

  const isMinParticipants = minParticipants
    ? count === minParticipants + 1
    : count === 2;

  return (
    <div className={styles.input}>
      <button
        className={`${styles.leftButton} ${isMinParticipants ? styles.gray : styles.blue}`}
        onClick={handleDecrement}
        type="button">
        <Image
          src={
            isMinParticipants
              ? '/assets/icons/minus-gray.svg'
              : '/assets/icons/minus-blue.svg'
          }
          alt="- 이미지"
          width={24}
          height={24}
        />
      </button>
      <div
        className={`${styles.numberBackground}  ${count === 30 ? styles.gray : styles.blue}`}>
        <h2
          className={`${styles.number}  ${count === 30 ? styles.grayFont : styles.blueFont}`}>
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
