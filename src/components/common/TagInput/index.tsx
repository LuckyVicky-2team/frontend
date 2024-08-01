'use client';

import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Input from '../Input';
import Tag from '../Tag';
import styles from './TagInput.module.scss';

interface ITagInputProps {
  defaultValues?: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
}

export default function TagInput({ defaultValues, setItems }: ITagInputProps) {
  const [values, setValues] = useState<string[]>([]);

  const handleClickTagRemove = (targetValue: string) => {
    const newValues = values.filter(value => value !== targetValue);

    setValues(newValues);
    setItems(newValues);
  };

  const handleKeyupEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const targetValue = e.currentTarget.value;

      if (!targetValue || values.includes(targetValue) || values.length >= 5) {
        e.currentTarget.value = '';
        return;
      }

      const newValues = [...values, targetValue];

      setValues(newValues);
      setItems(newValues);
      e.currentTarget.value = '';
    }
  };

  useEffect(() => {
    if (!defaultValues) return;
    setValues(defaultValues);
    setItems(defaultValues);
  }, [defaultValues, setItems]);

  return (
    <div>
      <Input onKeyUp={handleKeyupEnter} />
      <div className={styles.values}>
        {values.map((value, idx) => {
          return (
            <Tag
              key={idx}
              onClick={() => handleClickTagRemove(value)}
              size="large">
              {value}
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
