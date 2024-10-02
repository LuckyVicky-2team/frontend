import { MouseEventHandler } from 'react';
import styles from './CheckButton.module.scss';

interface ICheckButtonProps {
  isChecked: boolean;
  onClick: MouseEventHandler;
}

export default function CheckButton({ isChecked, onClick }: ICheckButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.button} ${isChecked && styles.checked}`}
      onClick={onClick}
    />
  );
}
