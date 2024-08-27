import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './TypeInput.module.scss';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

interface ITypeInputProps {
  register: UseFormRegisterReturn<'type'>;
  freeButtonClick: boolean;
  setFreeButtonClick: Dispatch<SetStateAction<boolean>>;
}

export default function TypeInput({
  register,
  freeButtonClick,
  setFreeButtonClick,
}: ITypeInputProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={
          freeButtonClick ? styles.buttonNotClicked : styles.buttonClicked
        }
        onClick={() => {
          freeButtonClick && setFreeButtonClick(false);
        }}>
        <label htmlFor="ACCEPT" className={styles.label}>
          <Image
            src={'/assets/images/accept.png'}
            alt={'수락'}
            width={72}
            height={72}
          />
          <p>수락 기능</p>
        </label>
        <input id="ACCEPT" type="radio" value="ACCEPT" {...register} />
      </button>
      <button
        type="button"
        className={
          freeButtonClick ? styles.buttonClicked : styles.buttonNotClicked
        }
        onClick={() => {
          !freeButtonClick && setFreeButtonClick(true);
        }}>
        <label htmlFor="FREE" className={styles.label}>
          <Image
            src={'/assets/images/free.png'}
            alt={'수락'}
            width={72}
            height={72}
          />
          <p>자유 참가</p>
        </label>
        <input
          id="FREE"
          type="radio"
          value="FREE"
          defaultChecked
          {...register}
        />
      </button>
    </div>
  );
}
