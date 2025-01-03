import { useState } from 'react';
import Image from 'next/image';
import styles from './NumberInput.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';

interface INumberInputProps {
  setValue: UseFormSetValue<INewGatheringFormValuesRequest>;
  minParticipants?: number; //현재 참가인원
  currentMaxParticipants?: number; //리더가 설정한 최대 참가가능 인원
}

export default function NumberInput({
  setValue,
  minParticipants = 1,
  currentMaxParticipants,
}: INumberInputProps) {
  const arrangedMinNum =
    minParticipants && minParticipants > 2 ? minParticipants : 2;
  const [count, setCount] = useState<number>(
    currentMaxParticipants || arrangedMinNum
  );

  const handleDecrement = () => {
    if (count > arrangedMinNum) {
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

  const isMinParticipants =
    minParticipants && minParticipants > 2
      ? count === minParticipants
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
          width={18}
          height={18}
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
            width={18}
            height={18}
          />
        ) : (
          <Image
            src={'/assets/icons/plus-blue.svg'}
            alt="+ 이미지"
            width={18}
            height={18}
          />
        )}
      </button>
    </div>
  );
}
