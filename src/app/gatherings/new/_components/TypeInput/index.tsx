import { UseFormRegister } from 'react-hook-form';
import styles from './TypeInput.module.scss';
import { INewGatheringFormValuesRequest } from '@/types/request/Gatherings';
import { Dispatch, SetStateAction } from 'react';

interface ITypeInputProps {
  register: UseFormRegister<INewGatheringFormValuesRequest>;
  freeButtonClick: boolean;
  setFreeButtonClick: Dispatch<SetStateAction<boolean>>;
}

export default function TypeInput({
  register,
  freeButtonClick,
  setFreeButtonClick,
}: ITypeInputProps) {
  return (
    <>
      <label
        htmlFor="accept"
        className={
          freeButtonClick ? styles.buttonNotClicked : styles.buttonClicked
        }
      />
      <p>수락 기능</p>
      <input
        id="accept"
        type="radio"
        value="accept"
        {...register('type')}
        onClick={() => {
          freeButtonClick && setFreeButtonClick(false);
        }}
      />
      <label
        htmlFor="free"
        className={
          freeButtonClick ? styles.buttonClicked : styles.buttonNotClicked
        }
      />
      <p>자유 참가</p>
      <input
        id="free"
        type="radio"
        value="free"
        defaultChecked
        {...register('type')}
        onClick={() => {
          !freeButtonClick && setFreeButtonClick(true);
        }}
      />
    </>
  );
}
